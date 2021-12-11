import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Good from 'App/Models/Good'
import { buildPagination, buildResponse } from 'App/Utils/builder'
import goodSchema from 'shared/src/schemas/good'
import { createSchema } from 'App/Utils/schema'
import path from 'path'
import fs from 'fs'
import adonisrc from '../../../.adonisrc.json'

const PUBLIC_PATH = path.join(__dirname, `../../../${adonisrc.directories.public}`)

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
          .whereNull('deleted')
          .where('name', 'like', `%${params.name || ''}%`)
          .orderBy('id', 'desc')
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
        return ctx.response.badRequest(buildResponse(null, errors[0].message, -1, errors))
      }
    }

    try {
      await image?.moveToDisk(PUBLIC_PATH)
      const result = await Good.create({
        ...params,
        image: image?.fileName,
      })

      return buildResponse(result)
    } catch (error) {
      ctx.response.internalServerError(buildResponse(null, 'Create good fail', -1, error))
    }
  }

  public async update(ctx: HttpContextContract) {
    try {
      const id = ctx.params.id
      const params = ctx.request.body()
      const good = await Good.findOrFail(id)
      const image = ctx.request.file('image')
      const originalImage = good.image

      await image?.moveToDisk(PUBLIC_PATH)
      const result = await good
        .merge({
          name: params.name,
          description: params.description,
          price: params.price,
          inventory: params.inventory,
          image: image?.fileName || good.image,
        })
        .save()
      if (image?.fileName) {
        fs.unlink(`${PUBLIC_PATH}/${originalImage}`, () => {})
      }

      return buildResponse(result)
    } catch (error) {
      return ctx.response.internalServerError(buildResponse(null, 'Update good fail', -1, error))
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

  public async check(ctx: HttpContextContract) {
    try {
      const params = ctx.request.qs()
      const ids = (params.ids || '').split(',')
      const result = await Good.query().whereIn('id', ids).whereNull('deleted')

      return buildResponse(
        result.reduce((acc, good) => {
          acc[good.id] = good.inventory

          return acc
        }, {}),
        'Goods fetched success',
        0
      )
    } catch {
      return ctx.response.internalServerError(buildResponse(null, 'Goods fetched fail', -1))
    }
  }
}
