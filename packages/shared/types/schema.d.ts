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

export type NumberRule = BaseRule & {
    min?: number;
    max?: number;
}

export type Rule<type> = type extends SchemaType.String ? StringRule : NumberRule;

export type Schema = {
    type: SchemaType;
    rules?: Rule<Schema['type']>[];
    schemas?: Record<string, Schema>;
    defaultValue?: string | number | boolean;
}
