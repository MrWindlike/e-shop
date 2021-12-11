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
        created_at: new Date(),
        updated_at: new Date(),
      })

      await Promise.all([
        ...goods.map(async (good) => {
          const data = await Good.query().where('id', good.id).where('price', good.price).first()
          const [{ affectedRows }] = await trx.rawQuery(
            `UPDATE goods SET inventory = inventory - ${good.count} WHERE id = ${good.id} AND inventory >= ${good.count}`
          )

          if (!data) {
            await trx.rollback()
            return ctx.response.internalServerError(
              buildResponse(null, 'good info has changed, please refresh', -2)
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
            throw new Error(`Not enough inventory`)
          }
        }),
        trx.insertQuery().table('notifications').insert({
          order_id: orderId,
          created_at: new Date(),
          updated_at: new Date(),
        }),
      ])

      await trx.commit()

      return buildResponse(null, 'Order created successfully')
    } catch (error) {
      await trx.rollback()
      return ctx.response.internalServerError(buildResponse(null, error.message))
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
        buildResponse(null, 'Orders fetched fail', -1, error.toString())
      )
    }
  }
}
