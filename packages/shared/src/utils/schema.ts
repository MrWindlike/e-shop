import { Schema, StringRule } from '../../types/schema.d';
import { SchemaType } from '../const/schema';

const RULE_MAP: Record<string, any> = {
  maxLength: 'max',
  minLength: 'min',
  regex: {
    key: 'validator',
    value: (rule: StringRule)=> (validatedRule: any, value: string, callback: any)=>  {
      if (rule.regex?.test(value)) {
        callback();
      } else {
        callback(rule.message);
      }
    }
  }
};

const TYPE_MAP: Record<string, SchemaType> = {
  [SchemaType.File]: SchemaType.Array,
};

export function transformSchemaToRules(schemas: Record<string, Schema>) {
  return Object.keys(schemas).reduce((rules: Record<string, any>, key) => {
    const schema = schemas[key];

    rules[key] = schema.rules?.map((rule) => {
      return Object.keys(rule).reduce((acc: Record<string, any>, ruleKey) => {
        if (ruleKey in RULE_MAP) {
          if (typeof RULE_MAP[ruleKey] === 'object') {
            acc[RULE_MAP[ruleKey].key] = RULE_MAP[ruleKey].value(rule);
          } else {
            acc[RULE_MAP[ruleKey]] = rule[ruleKey as keyof typeof rule];
          }
        } else if (ruleKey in rule) {
          acc[ruleKey] = rule[ruleKey as keyof typeof rule];
        }

        return acc;
      }, { type: schema.type in TYPE_MAP ? TYPE_MAP[schema.type] : schema.type });
    });

    return rules;
  }, {});
}
