import { Schema } from 'shared/types/schema.d';

export function createSchema(schemas: Record<string, Schema>) {
  return Object.keys(schemas).reduce((rules, key) => {
    rules[key] = schemas[key].rules?.map((rule) => {
      if (rule.regex) {
        return {
          ...rule,
          validator(validatedRule, value, callback) {
            if (rule.regex.test(value)) {
              callback();
            } else {
              callback(rule.message);
            }
          },
        };
      }

      return rule;
    });

    return rules;
  }, {});
}
