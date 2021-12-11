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
        throw new Error('商品不存在')
      }

      return buildResponse(good)
    } catch {
      return ctx.response.internalServerError(buildResponse(null, '商品不存在', -1))
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
      return ctx.response.internalServerError(
        buildResponse(null, '获取商品列表失败，请稍后再试', -1)
      )
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

      return buildResponse(result, '创建商品成功')
    } catch (error) {
      ctx.response.internalServerError(buildResponse(null, '创建商品失败', -1, error))
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

      return buildResponse(result, '更新商品信息成功')
    } catch (error) {
      return ctx.response.internalServerError(buildResponse(null, '更新商品信息失败', -1, error))
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
        return buildResponse(null, '删除商品成功', 0)
      } else {
        return ctx.response.internalServerError(buildResponse(null, '商品不存在', -1))
      }
    } catch {
      return ctx.response.internalServerError(buildResponse(null, '删除商品失败', -1))
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
        '获取商品库存成功',
        0
      )
    } catch {
      return ctx.response.internalServerError(buildResponse(null, '获取商品库存失败', -1))
    }
  }
}
