import Parser from './parser';
import { Model, ModelField } from './model';

export type ModelPattern = {
  path: string;
  id: string;
  realKey: string;
} & ModelField;

export interface BlockMatch {
  match: boolean;
  starting?: boolean;
  ending?: boolean;
  inline?: boolean;
  parameter?: string;
  prop?: string;
  propPosition?: number;
  propValue?: string;
  isEval?: boolean;
}

export interface RawParseResultProps {
  type: 'prop' | 'block' | 'text';
  propName?: string;
  value?: string;
  tagName?: string;
  param?: string;
  isEval?: boolean;
  asString: string;
  content?: (RawParseResultProps | string)[];
}

export class RawParseResult extends Array {
  [index: number]: RawParseResultProps;
}

export interface UrdObjectProps {
  __isEval?: boolean;
  __text?: string;
  __param?: string;
}

export interface UrdObjectData {
  [key: string]: UrdObjectProps | UrdObjectData;
}

export class Urd {
  static parse(input: string, model: Model) {
    let result = Parser.parse(input, {}) as RawParseResult;
    let object = {} as UrdObjectData;

    const fillProp = (obj: UrdObjectProps, data: RawParseResultProps) => {
      const index = data.propName;
      if (index in obj) {
        if (Array.isArray(obj[index])) {
          obj[index].push(data.value);
        } else {
          obj[index] = [obj[index], data.value];
        }
      } else {
        obj[index] = data.value;
      }
    };

    const fillBlock = (obj: UrdObjectProps, data: RawParseResultProps) => {
      const index = data.tagName;
      const param = data.param;
      if (index in obj) {
        if (Array.isArray(obj[index])) {
          obj[index].push({
            __param: param,
            __isEval: data.isEval
          });
        } else {
          obj[index] = [
            obj[index],
            {
              __param: param,
              __isEval: data.isEval
            }
          ];
        }
      } else {
        obj[index] = {
          __param: param,
          __isEval: data.isEval
        };
      }
      fill(Array.isArray(obj[index]) ? obj[index][obj[index].length - 1] : obj[index], data.content || ([] as any));
    };

    const fill = (obj: UrdObjectProps, set: RawParseResult) => {
      set = set.filter((i: any) => !!i);
      const text = [];

      for (const data of set) {
        switch (data.type) {
          case 'prop':
            fillProp(obj, data);
            break;
          case 'block':
            fillBlock(obj, data);
            break;
          case 'text':
            text.push(data.value.trim());
            break;
          default:
            throw new Error('Invalid type');
        }
      }
      obj.__text = text.join('\n');
    };
    fill(object, result);

    for (const [key, value] of Object.entries(object)) {
      if (key.startsWith('__')) continue;
      object[key + 'Values'] = Array.isArray(value) ? [...value] : ([value] as any);
      if (Array.isArray(value)) {
        object[key] = value[0];
      }
    }
    return object;
  }

  static makePatterns(model: Model) {
    let modelPatterns: ModelPattern[] = [];

    const makePattern = (data = model, iniPath = '__root__') => {
      let path = iniPath;
      for (const [key, value] of Object.entries(data)) {
        let id = value.display || key;
        if (typeof value === 'object') {
          modelPatterns.push({
            id,
            path,
            realKey: key,
            ...value
          });
          if ('fields' in value) {
            path += '.' + id;
            makePattern(value.fields, path);
          }
        }
      }
    };
    makePattern();
    return modelPatterns;
  }

  static makePaths(text: string) {
    const paths = ['__root__'];
    const lines = text.split('\n');
    for (const line of lines) {
      const match = this.matchBlock(line);
      if (match.starting) {
        paths.push(match.prop);
      } else if (match.ending) {
        paths.pop();
      }
    }
    return paths;
  }

  static matchBlock(str: string) {
    let res: BlockMatch = { match: false };
    if (str.match(/^(\s*[^<]+)(:)(.+[^>])/i)) {
      res = {
        match: true,
        prop: RegExp.$1.trim(),
        propPosition: RegExp.$1.length - RegExp.$1.trim().length,
        propValue: RegExp.$3,
        inline: true
      };
    } else if (str.match(/^(\s*<)([^\/:]+)(>)/i)) {
      let prop = RegExp.$2;
      if (prop.startsWith('!')) {
        prop = prop.substr(1, prop.length - 1);
        res.isEval = true;
      }
      res = {
        ...res,
        match: true,
        starting: true,
        prop,
        propPosition: RegExp.$1.length
      };
    } else if (str.match(/^(\s*<)([^\/]+)(:)(.+)(>)/i)) {
      let prop = RegExp.$2;
      if (prop.startsWith('!')) {
        prop = prop.substr(1, prop.length - 1);
        res.isEval = true;
      }
      res = {
        ...res,
        match: true,
        starting: true,
        prop,
        propPosition: RegExp.$1.length,
        parameter: RegExp.$4
      };
    } else if (str.match(/^(\s*<\/)([^:]+)(>)/i)) {
      res = {
        match: true,
        ending: true,
        prop: RegExp.$2,
        propPosition: RegExp.$1.length
      };
    }
    return res;
  }
}
