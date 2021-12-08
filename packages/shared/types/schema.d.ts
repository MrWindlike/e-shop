import { SchemaType } from '../src/const/schema';

export type BaseRule = {
    required?: boolean;
    message?: string;
}

export type StringRule = BaseRule & {
    minLength?: number;
    maxLength?: number;
    regex?: RegExp;
}

export type StringOptions = {
  escape?: boolean;
  trim?: boolean;
}

export type NumberRule = BaseRule & {
    min?: number;
    max?: number;
}

export type FileOptions = {
  size?: string | number;
  extnames?: string[];
}

export type Rule<type> = type extends SchemaType.String ? StringRule : NumberRule;

export type Options<type> = type extends SchemaType.String ? StringOptions : FileOptions;

export type Schema = {
    type: SchemaType;
    rules?: Rule<Schema['type']>[];
    schemas?: Record<string, Schema>;
    defaultValue?: string | number | boolean;
    options?: Options<Schema['type']>;
}
