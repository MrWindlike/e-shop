import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'
import { buildPagination, buildResponse } from 'App/Utils/builder'

export default class LogController {
  public async create(ctx: HttpContextContract) {
    try {
      const params = ctx.request.body()

      const result = await Log.create(params)

      return buildResponse(result, 'Log created successfully')
    } catch (error) {
      return ctx.response.internalServerError(buildResponse(null, 'Log created fail', -1, error))
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
          .paginate(pagination.page, pagination.perPage)
      ).toJSON()

      return buildResponse(
        {
          list: logs.data,
          total: logs.meta.total,
        },
        'Logs listed successfully'
      )
    } catch (error) {
      return ctx.response.internalServerError(buildResponse(null, 'Fetch logs fail', -1, error))
    }
  }
}
