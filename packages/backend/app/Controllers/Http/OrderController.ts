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
          .paginate(pagination.page, pagination.perPage)
      ).toJSON()

      return buildResponse({
        list: orders.data,
        total: orders.meta.total,
      })
    } catch (error) {
      return ctx.response.internalServerError(
        buildResponse(null, 'Orders fetched fail', -1, error.toString())
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
      })

      await Promise.all([
        ...goods.map(async (good) => {
          const [count] = await trx
            .modelQuery(Good)
            .where('id', good.id)
            .where('inventory', '>=', good.count)
            .decrement('inventory', good.count)

          await trx.insertQuery().table('order_infos').insert({
            order_id: orderId,
            good_id: good.id,
            price: good.price,
            count: good.count,
            status: Status.START,
          })

          if (count === 0) {
            throw new Error(`Not enough inventory`)
          }
        }),
        trx.insertQuery().table('notifications').insert({
          order_id: orderId,
        }),
      ])

      await trx.commit()

      return buildResponse(null, 'Order created successfully')
    } catch (error) {
      await trx.rollback()
      return ctx.response.internalServerError(buildResponse(null, error.message))
    }
  }
}
