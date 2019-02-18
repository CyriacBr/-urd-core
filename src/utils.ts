import * as fs from 'fs';

export function recurse(dir: string, onFile: (file: string) => void) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, function(error, list) {
      if (error) {
        return reject(error);
      }

      let i = 0;

      (function next() {
        let file = list[i++];

        if (!file) {
          return resolve(null);
        }

        file = dir + '/' + file;

        fs.stat(file, async function(error, stat) {
          if (stat && stat.isDirectory()) {
            await recurse(file, onFile);
            next();
          } else {
            onFile(file);
            next();
          }
        });
      })();
    });
  });
}

const preventSet = () => {
  throw new Error('Do not change properties on this object');
};

export const makeReadOnly = <T>(object: T): T => {
  return new Proxy(object as Object, {
    set: preventSet,
    defineProperty: preventSet,
    // deleteProperty: preventSet,
    setPrototypeOf: preventSet,
    get: function(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      if (typeof result === 'object') {
        return makeReadOnly(result);
      }
      return result;
    }
  }) as T;
};
