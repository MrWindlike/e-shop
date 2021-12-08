import { Schema } from '../../types/schema.d';

export function transformSchemaToRules(schemas: Record<string, Schema>) {
  return Object.keys(schemas).reduce((rules, key) => {
    rules[key] = schemas[key].rules?.map((rule) => {
      if ('regex' in rule) {
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
