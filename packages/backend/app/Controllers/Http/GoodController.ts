import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Good from 'App/Models/Good'
import { buildPagination, buildResponse } from 'App/Utils/builder'
import goodSchema from 'shared/lib/schemas/good'
import { createSchema } from 'App/Utils/schema'

export default class GoodController {
  public async list(ctx: HttpContextContract) {
    try {
      const params = ctx.request.qs()
      const pagination = buildPagination(params)
      const goods = (
        await Good.query()
          .whereNull('deleted')
          .where('name', 'like', `%${params.name}%`)
          .paginate(pagination.page, pagination.perPage)
      ).toJSON()

      return buildResponse({
        list: goods.data,
        total: goods.meta.total,
      })
    } catch {
      return ctx.response.internalServerError(buildResponse(null, 'Goods fetched fail', -1))
    }
  }

  public async create(ctx: HttpContextContract) {
    const schema = createSchema(goodSchema)
    const params = ctx.request.body()

    try {
      await ctx.request.validate({
        schema,
        cacheKey: ctx.routeKey,
      })
    } catch ({ messages: { errors } }) {
      if (errors.length) {
        return ctx.response.badRequest(buildResponse(null, errors[0].message, -1))
      }
    }

    try {
      const result = await Good.create(params)

      return buildResponse(result)
    } catch (error) {
      ctx.response.internalServerError(buildResponse(null, 'Create good fail', -1))
    }
  }

  public async update(ctx: HttpContextContract) {
    try {
      const id = ctx.params.id
      const params = ctx.request.body()
      const good = await Good.findOrFail(id)
      const result = await good.merge(params).save()

      return buildResponse(result)
    } catch {
      return ctx.response.internalServerError(buildResponse(null, 'Update good fail', -1))
    }
  }

  public async delete(ctx: HttpContextContract) {
    try {
      const id = ctx.params.id
      const [count] = await Good.query()
        .whereNull('deleted')
        .where('id', id)
        .update({ deleted: true })

      if (count) {
        return buildResponse(null, 'Good deleted', 0)
      } else {
        return ctx.response.internalServerError(buildResponse(null, 'Good not found', -1))
      }
    } catch {
      return ctx.response.internalServerError(buildResponse(null, 'Delete good fail', -1))
    }
  }
}
