export type Model = { [property: string]: ModelField };
export type ModelSet = { [modelName: string]: Model };

export interface ModelField {
  type: 'string' | 'number' | 'text' | 'list' | 'code' | 'structure';
  display?: string;
  desc?: string;
  default?: string;
  fields?: { [index: string]: ModelField };
  context?: string;
  suggestions?: string[];
  multiple?: boolean;
  disableEval?: boolean;
}