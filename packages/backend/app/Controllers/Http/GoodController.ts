import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Good from 'App/Models/Good'
import { buildPagination, buildResponse } from 'App/Utils/builder'
import goodSchema from 'shared/src/schemas/good'
import { createSchema } from 'App/Utils/schema'
import path from 'path'

export default class GoodController {
  public async show(ctx: HttpContextContract) {
    try {
      const id = ctx.params.id
      const good = await Good.findOrFail(id)

      if (good.deleted) {
        throw new Error('Good not found')
      }

      return buildResponse(good)
    } catch {
      return ctx.response.internalServerError(buildResponse(null, 'Good not found', -1))
    }
  }

  public async list(ctx: HttpContextContract) {
    try {
      const params = ctx.request.qs()
      const pagination = buildPagination(params)
      const goods = (
        await Good.query()
          .select('id', 'name', 'price', 'inventory')
          .whereNull('deleted')
          .where('name', 'like', `%${params.name || ''}%`)
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
    const image = ctx.request.file('image')

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
      const [result] = await Promise.all([
        Good.create(params),
        image?.moveToDisk(path.resolve(__dirname, '../public')),
      ])

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

  public async exist(ctx: HttpContextContract) {
    try {
      const params = ctx.request.qs()
      const ids = (params.ids || '').split(',')
      const result = await Good.query().whereIn('id', ids).whereNull('deleted')

      return buildResponse(
        result.map((good) => good.id),
        'Goods fetched success',
        0
      )
    } catch {
      return ctx.response.internalServerError(buildResponse(null, 'Goods fetched fail', -1))
    }
  }
}
