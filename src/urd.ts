import * as Parser from './parser.js';
import { BlockMatch, Model, ModelPattern } from './model';

export class Urd {
  static parse(input: string) {
    let result = Parser.parse(input);
    let object = {};
    const fill = (obj: any, set: any) => {
      set = set.filter((i: any) => !!i);
      obj.$text = [];
      for (const data of set) {
        if (data.type === 'prop') {
          obj[data.prop] = data.value;
        } else if (data.type === 'tag') {
          if (typeof data.tag === 'object') {
            obj[data.tag.name] = {
              $tag: data.tag.arg
            };
            fill(obj[data.tag.name], data.content || []);
          } else {
            obj[data.tag] = {};
            fill(obj[data.tag], data.content || []);
          }
        } else if (typeof data === 'string') {
          obj.$text.push(data);
        }
      }
      obj.$text = obj.$text.join('\n');
    };
    fill(object, result);
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
            type: value.type,
            desc: value.desc,
            realKey: key,
            context: value.context,
            suggestions: value.suggestions
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
