import { BlockMatch, Model, ModelPattern } from './model';
export declare class Urd {
    static parse(input: string): {};
    static makePatterns(model: Model): ModelPattern[];
    static makePaths(text: string): string[];
    static matchBlock(str: string): BlockMatch;
}
