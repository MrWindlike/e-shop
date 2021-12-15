import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Notification from 'App/Models/Notification'
import { buildPagination, buildResponse } from 'App/Utils/builder'

export default class NotificationController {
  public async list(ctx: HttpContextContract) {
    try {
      const pagination = buildPagination(ctx.request.qs())

      const notifications = (
        await Notification.query()
          .preload('order', (orderQuery) => {
            orderQuery.preload('orderInfos')
            orderQuery.preload('user')
          })
          .orderBy('id', 'desc')
          .paginate(pagination.page, pagination.perPage)
      ).toJSON()

      return buildResponse({
        list: notifications.data,
        total: notifications.meta.total,
      })
    } catch {
      return ctx.response.internalServerError(buildResponse(null, '获取通知列表失败', -1))
    }
  }

  public async count(ctx: HttpContextContract) {
    try {
      const notifications = await Notification.query().where('isRead', false).count('* as total')

      return buildResponse(notifications[0].total)
    } catch {
      return ctx.response.internalServerError(buildResponse(null, '获取通知数量失败', -1))
    }
  }
}
