import * as fs from 'fs';
import { basename, join, resolve, dirname } from 'path';
import { recurse } from './utils';
import { Model } from './model';
import { getClassString } from './tool';
import * as ora from 'ora';

const action = process.argv[2];
if (action === 'generate' || action === 'g') {
  generate();
}

function generate() {
  const type = process.argv[3];
  if (type === 'items' || type === 'i') {
    generateItems();
  }
}

async function generateItems() {
  const path = process.cwd();
  const spinner = ora('Looking for urd models inside ' + path).start();
  await recurse(path, (file: string) => {
    if (file.match(/\/node_modules\//)) return;
    if (file.match(/\/\.git\//)) return;
    if (file.match(/\/(.+)\.urd-model\.ts/i)) {
      const filename = basename(file);
      const model: Model = require(file).default;
      if (filename.match(/(.+)\.urd-model\.ts/)) {
        const itemFilename = RegExp.$1;

        const spinner = ora(`Generating ${itemFilename}.urd-item.ts`).start();
        spinner.color = 'yellow';

        const className = itemFilename[0].toUpperCase() + itemFilename.substr(1, itemFilename.length - 1) + 'Item';
        const content = getClassString(model, className);
        const dirPath = dirname(file);
        const destFile = resolve(dirPath, `${itemFilename}.urd-item.ts`);
        fs.writeFile(destFile, content, err => {
          if (err) {
            spinner.fail();
            throw new Error('Could not write to ' + destFile);
          }
          spinner.succeed(`${itemFilename}.urd-item.ts generated`);
        });
      }
    }
  });
  spinner.stopAndPersist({});
}
