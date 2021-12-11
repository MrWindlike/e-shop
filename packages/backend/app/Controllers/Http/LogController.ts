import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'
import { buildPagination, buildResponse } from 'App/Utils/builder'

export default class LogController {
  public async create(ctx: HttpContextContract) {
    try {
      const params = ctx.request.body()

      await Log.create(params)

      return buildResponse(null, '创建日志成功')
    } catch (error) {
      return ctx.response.internalServerError(buildResponse(null, '创建日志失败', -1, error))
    }
  }

  public async list(ctx: HttpContextContract) {
    try {
      const params = ctx.request.qs()
      const pagination = buildPagination(params)

      const logs = (
        await Log.query()
          .preload('user')
          .preload('good')
          .orderBy('id', 'desc')
          .paginate(pagination.page, pagination.perPage)
      ).toJSON()

      return buildResponse(
        {
          list: logs.data,
          total: logs.meta.total,
        },
        '获取日志列表成功'
      )
    } catch (error) {
      return ctx.response.internalServerError(buildResponse(null, '获取日志列表失败', -1, error))
    }
  }
}
