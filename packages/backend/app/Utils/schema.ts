import { Schema } from 'shared/types/schema'
import { SchemaType } from 'shared/lib/const/schema'
import { schema as schemaTool, rules as rulesTool } from '@ioc:Adonis/Core/Validator'

export function adaptSchema(schemas: Record<string, Schema> = {}) {
  return Object.entries(schemas).reduce((acc, [key, schema]) => {
    const rules = []
    let required = false

    if (schema.type === SchemaType.Array) {
      const members = schemaTool.object().members(adaptSchema(schema.schemas))

      acc[key] = schemaTool.array().members(members)
    } else {
      ;(schema.rules || []).forEach((rule) => {
        if (schema.type === SchemaType.String) {
          if (rule.minLength) {
            rules.push(rulesTool.minLength(rule.minLength))
          }
          if (rule.maxLength) {
            rules.push(rulesTool.maxLength(rule.maxLength))
          }
          if (rule.regex) {
            rules.push(rulesTool.regex(rule.regex))
          }
        } else if (schema.type === SchemaType.Number) {
          if (rule.min || rule.max) {
            rules.push(
              rulesTool.range(
                rule.min || Number.MIN_SAFE_INTEGER,
                rule.max || Number.MAX_SAFE_INTEGER
              )
            )
          }
        }
        if (rule.required) {
          required = true
        }
      })

      const fn = required ? schemaTool[schema.type] : schemaTool[schema.type].optional

      acc[key] = schema.type === SchemaType.String ? fn({}, rules) : fn(rules)
    }

    return acc
  }, {})
}

export function createSchema(schemas: Record<string, Schema> = {}) {
  const adaptedSchema = adaptSchema(schemas)

  return schemaTool.create(adaptedSchema)
}
