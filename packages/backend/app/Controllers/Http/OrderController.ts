import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Order from 'App/Models/Order'
import Good from 'App/Models/Good'
import { buildPagination, buildResponse } from 'App/Utils/builder'
import { createSchema } from 'App/Utils/schema'
import orderSchema from 'shared/src/schemas/order'
import { Status } from 'shared/src/const/order'

export default class OrderController {
  public async list(ctx: HttpContextContract) {
    try {
      const user = ctx.auth.user
      const params = ctx.request.qs()
      const pagination = buildPagination(params)
      const orders = (
        await Order.query()
          .where('userId', user?.id || 0)
          .preload('address')
          .preload('orderInfos', (orderInfoQuery) => {
            orderInfoQuery.preload('good')
          })
          .orderBy('id', 'desc')
          .paginate(pagination.page, pagination.perPage)
      ).toJSON()

      return buildResponse({
        list: orders.data,
        total: orders.meta.total,
      })
    } catch (error) {
      return ctx.response.internalServerError(
        buildResponse(null, '获取订单列表失败，请稍后再试', -1, error.toString())
      )
    }
  }

  public async create(ctx: HttpContextContract) {
    const { addressId, goods } = ctx.request.body()
    const user = ctx.auth.user
    const schema = createSchema(orderSchema)

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

    const trx = await Database.transaction()

    try {
      const [orderId] = await trx.insertQuery().table('orders').insert({
        address_id: addressId,
        user_id: user?.id,
        created_at: new Date(),
        updated_at: new Date(),
      })

      await Promise.all([
        ...goods.map(async (good) => {
          const data = await Good.query().where('id', good.id).where('price', good.price).first()
          const [{ affectedRows }] = await trx.rawQuery(
            `UPDATE goods SET inventory = inventory - :count WHERE id = :id AND inventory >= :count`,
            {
              count: good.count,
              id: good.id,
            }
          )

          if (!data) {
            await trx.rollback()
            return ctx.response.internalServerError(
              buildResponse(null, '商品信息有变化，请重新尝试下单', -2)
            )
          }

          await trx.insertQuery().table('order_infos').insert({
            order_id: orderId,
            good_id: data.id,
            price: data.price,
            count: good.count,
            status: Status.START,
            created_at: new Date(),
            updated_at: new Date(),
          })

          if (!affectedRows) {
            throw new Error(`商品库存不足`)
          }
        }),
        trx.insertQuery().table('notifications').insert({
          order_id: orderId,
          created_at: new Date(),
          updated_at: new Date(),
        }),
      ])

      await trx.commit()

      return buildResponse(null, '创建订单成功')
    } catch (error) {
      await trx.rollback()
      return ctx.response.internalServerError(
        buildResponse(null, '创建订单失败，请稍后再试', -1, error)
      )
    }
  }

  public async all(ctx: HttpContextContract) {
    try {
      const params = ctx.request.qs()
      const pagination = buildPagination(params)
      const orders = (
        await Order.query()
          .preload('user')
          .preload('address')
          .preload('orderInfos', (orderInfoQuery) => {
            orderInfoQuery.preload('good')
          })
          .orderBy('id', 'desc')
          .paginate(pagination.page, pagination.perPage)
      ).toJSON()

      return buildResponse({
        list: orders.data,
        total: orders.meta.total,
      })
    } catch (error) {
      return ctx.response.internalServerError(
        buildResponse(null, '获取订单列表失败，请稍后再试', -1, error.toString())
      )
    }
  }
}
