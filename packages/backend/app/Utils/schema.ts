import { Schema } from 'shared/types/schema'
import { SchemaType } from 'shared/src/const/schema'
import { schema as schemaTool, rules as rulesTool } from '@ioc:Adonis/Core/Validator'

// 函数与参数名的映射，当有用到相应参数时，调用对应函数并从规则中读取参数的值进行传入
const map = {
  minLength: ['minLength'],
  maxLength: ['maxLength'],
  regex: ['regex'],
  range: ['min', 'max'],
}

export function adaptSchema(schemas: Record<string, Schema> = {}) {
  return Object.entries(schemas).reduce((acc, [key, schema]) => {
    const rules: any[] = []
    let required = false

    if (schema.type === SchemaType.Array) {
      const members = schemaTool.object().members(adaptSchema(schema.schemas))

      acc[key] = schemaTool.array().members(members)
    } else {
      ;(schema.rules || []).forEach((rule) => {
        Object.keys(map).forEach((key) => {
          const args = map[key]

          if (args.some((name) => rule[name])) {
            rules.push(
              rulesTool[key].apply(
                rulesTool,
                args.map((k) => rule[k])
              )
            )
          }
        })

        if (rule.required) {
          required = true
        }
      })

      const fn = required ? schemaTool[schema.type] : schemaTool[schema.type].optional

      acc[key] = schema.type === SchemaType.String ? fn(schema.options || {}, rules) : fn(rules)
    }

    return acc
  }, {})
}

export function createSchema(schemas: Record<string, Schema> = {}) {
  const adaptedSchema = adaptSchema(schemas)

  return schemaTool.create(adaptedSchema)
}
