import { Model, ModelField } from './model';

let currentName = '';

function addIndent(level: number, text: string) {
  return text
    .split('\n')
    .map(
      line =>
        Array(level)
          .fill('\t')
          .join('') + line
    )
    .join('\n');
}

function makeInterfaceBlock(fields: [string, ModelField][], indentLevel: number = 1) {
  const result = `{\n${addIndent(
    indentLevel,
    fields
      .map(d => {
        let lineResult = 'readonly ';
        const [fieldName, field] = d;
        const displayType: string =
          {
            code: 'any',
            text: 'string',
            list: 'string[]'
          }[field.type] || field.type;
        const fieldNameAsType = `I${currentName}.${fieldName[0].toUpperCase() +
          fieldName.substr(1, fieldName.length - 1)}`;
        let returnType: string;
        if (field.type === 'structure') {
          returnType = `Promise<${fieldNameAsType}>`;
        } else if (field.type === 'code') {
          returnType = `(context: ${field.context || 'any'}) => Promise<any>`;
        } else if (field.type === 'string' && field.suggestions && field.suggestions.length >= 0) {
          const suggestions = [displayType].concat(field.suggestions.map(l => `'${l}'`));
          returnType = `Promise<${suggestions.join(' | ')}>`;
        } else {
          returnType = `Promise<${displayType}>`;
        }
        lineResult = `readonly ${fieldName}: (option?: Option) => ${returnType};`;
        let valuesType =
          {
            structure: fieldNameAsType,
            code: `(context: ${field.context || 'any'}) => Promise<any>`
          }[field.type] || displayType;

        lineResult += `\nreadonly ${fieldName}Values: Array<(option?: Option) => ${returnType}>;`;
        if (field.disableEval) {
          lineResult = lineResult.replace(/Promise<(.+)>/g, '$1');
        }
        return lineResult + '\n';
      })
      .join('\n')
  )}\n${new Array(indentLevel - 1).fill(0).map(v => '\t')}}`;
  return result;
}

function makeInterfaces(model: Model, name: string) {
  return `interface Option {
    context?: any;
    param?: string;
  }

  export namespace I${name} {\n${Object.entries(model)
    .map(([key, value]) => {
      if (value.type === 'structure') {
        return `\texport interface ${key[0].toUpperCase() + key.substr(1, key.length - 1)} ${makeInterfaceBlock(
          Object.entries(value.fields),
          2
        )}`;
      }
      return null;
    })
    .filter(v => !!v)
    .join('\n')}\n}`;
}

export function getClassString(model: Model, name: string) {
  currentName = name;
  return `${makeInterfaces(model, name)}\n\nexport class ${name} ${makeInterfaceBlock(Object.entries(model))};`;
}
