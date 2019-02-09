export declare type Model = {
    [property: string]: ModelField;
};
export declare type ModelSet = {
    [modelName: string]: Model;
};
export interface ModelField {
    type: 'string' | 'number' | 'text' | 'list' | 'code' | 'structure';
    display?: string;
    desc?: string;
    default?: string;
    fields?: {
        [index: string]: ModelField;
    };
    context?: string;
    suggestions?: string[];
}
export interface ModelPattern {
    type: 'string' | 'number' | 'text' | 'list' | 'code' | 'structure';
    path: string;
    id: string;
    desc: string;
    realKey: string;
    context: string;
    suggestions: string[];
}
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
