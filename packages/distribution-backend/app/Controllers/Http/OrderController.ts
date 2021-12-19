import { buildResponse } from 'App/Utils/builder';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';

export default class OrderController {
  async all(ctx: HttpContextContract) {
    try {
      const params = ctx.request.qs()

      const { data: {data} } = await axios.get('http://127.0.0.1:3333/distribution/orders', {
        params,
        headers: {
          appid: 'distribution'
        }
      })

      return buildResponse(data)
    } catch (err) {
      return ctx.response.internalServerError(buildResponse(null, '获取订单列表失败，请稍后再试'))
    }
  }
}
