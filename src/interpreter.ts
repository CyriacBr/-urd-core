import * as ts from 'typescript';
import { Model } from './model';
import { Urd, UrdObjectData, UrdObjectProps, ModelPattern } from './urd';
import { PersonItem } from '../tests/person.urd-item';
import { personModel } from '../tests/person.urd-model';
import { makeReadOnly } from './utils';

export class UrdRepository<T> {
  readonly id: string;
  readonly model: Model;
  readonly objects: { [itemId: string]: UrdObjectData } = {};
  constructor(model: Model, id: string) {
    this.model = model;
    this.id = id;
  }

  set(itemId: string, text: string) {
    const urdObj = Urd.parse(text, this.model);
    this.objects[itemId] = makeReadOnly<UrdObjectData>(urdObj);
  }

  get(itemId: string) {
    return this.objects[itemId];
  }

  interpret(itemId: string, context: any): T {
    const urdObj = this.get(itemId);
    return UrdInterpreter.get<T>(this.model, urdObj, context);
  }
}

export class UrdItem {
  parseObj: any;
  context: any;
  constructor(parseObj: any | string, context: any) {
    this.parseObj = { ...parseObj };
    this.context = context;
  }
}

export class UrdInterpreter {
  static models: { [itemName: string]: Model };
  static functionCache: { [tsCode: string]: string };

  static preventMutation() {
    throw new Error('Do not change properties on this object');
  }

  static get<T>(model: Model, parseObj: UrdObjectData, context: any): T {
    const patterns = Urd.makePatterns(model);

    const makeProxy = (object: UrdObjectData, paths = ['__root__']) => {
      const obj = new Proxy(object, {
        set: this.preventMutation.bind(this),
        defineProperty: this.preventMutation.bind(this),
        setPrototypeOf: this.preventMutation.bind(this),
        get: (target, p) => {
          if (typeof p === 'symbol') {
            return target;
          }
          if (p === 'then') {
            return target.then;
          }
          if (p in target) {
            return getProperty(target, p as string, paths);
          }
          throw new Error(`Property "${String(p)}" doesn't exist`);
        }
      });
      delete obj['__isEval'];
      delete obj['__param'];
      delete obj['__text'];
      return obj;
    };

    const getProperty = (object: UrdObjectData, prop: string, paths: string[]) => {
      const path = paths.join('.');
      const patternId = prop.match(/^(.+)Values/i) ? RegExp.$1 : prop;
      const pattern = patterns.find(p => p.id === patternId && p.path === path);
      const value = object[prop];

      if (!pattern) {
        throw new Error(`Can't find ${prop} in the model. patternId is ${patternId} and path is ${path}`);
      }

      const returnValuePerItem = (value: any) => {
        return (options: { param: string; context: any }) => {
          const ctx = (options ? options.context : context) || context;
          const { param } = options ? options : { param: null};
          if (param) {
            const values = object[prop.endsWith('Values') ? prop : prop + 'Values'];
            if (!values || !Array.isArray(values)) {
              return null;
            }
            value = values.find((v: UrdObjectProps) => v.__param === param);
            if (!value) {
              throw new Error(`Couldn't find property with param ${param}`);
            }
          }
          let returnValue: any;
          if (typeof value === 'object') {
            const props = value as UrdObjectProps;
            if (props.__isEval) {
              returnValue = this.transpileAndEval(props.__text, ctx, pattern);
            } else {
              switch (pattern.type) {
                case 'code':
                  returnValue = this.transpileAndEval(props.__text, ctx, pattern);
                  break;
                case 'list':
                  returnValue = props.__text.split('\n');
                  break;
                case 'text':
                  returnValue = props.__text;
                  break;
                case 'structure':
                  paths.push(prop);
                  returnValue = makeProxy(value as UrdObjectData, [...paths]);
                  paths.pop();
                default:
                  break;
              }
            }
          } else {
            returnValue = pattern.type === 'number' ? Number(value) : String(value);
          }
          return pattern.disableEval ? returnValue : Promise.resolve(returnValue);
        };
      };

      if (Array.isArray(value)) {
        return value.map(v => returnValuePerItem(v));
      }
      return returnValuePerItem(value);
    };

    const proxy: unknown = makeProxy(parseObj);
    return proxy as T;
  }

  static transpileAndEval(code: string, ctx: any, pattern: ModelPattern) {
    const result = ts.transpileModule(code, {
      compilerOptions: { module: ts.ModuleKind.CommonJS }
    });
    const codeStr = `(${pattern && pattern.disableEval ? '' : 'async '}function(){\n ${result.outputText}})()`;
    try {
      return function() {
        const context = { ...ctx };
        return eval(codeStr);
      }.call({});
    } catch (error) {
      throw error;
    }
  }
}

(async function() {
  const repo = new UrdRepository<PersonItem>(personModel, 'PersonItem');
  const text = `
name: George

<!age>
function add(a: number) {
  return 5 + a;
}
return add(10) + context.b;
</age>

<diary: monday>
Hello world!
We are monday
</diary>

<diary: sunday>
Hello world!
We are sunday
</diary>

<inventory>
type: Sacoche
slots: 4
</inventory>

<inventory>
type: Bag
slots: 2
</inventory>
  `;
  repo.set('George', text);
  const test = repo.interpret('George', { b: 30 });
  const name = test.name();
  const age = await test.age({ context: { b: 0 } });
  const mondayDiary = await test.diary({ param: 'monday' });
  console.log('name :', name);
  console.log('age :', age);
  console.log('mondayDiary :', mondayDiary);

  const diaries = test.diaryValues;
  for (const diaryFunc of diaries) {
    const diary = await diaryFunc();
    console.log('diary :', diary);
  }

  const inventory = await test.inventory();
  console.log('inventory :', inventory);
})();
