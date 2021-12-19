import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Silent auth middleware can be used as a global middleware to silent check
 * if the user is logged-in or not.
 *
 * The request continues as usual, even when the user is not logged-in.
 */
export default class ApiMiddleware {
  /**
   * Handle request
   */
  public async handle(ctx: HttpContextContract, next: () => Promise<void>, apps) {
    const appid = ctx.request.header('appid')

    console.log(appid, apps)

    if (apps.includes(appid)) {
      await next()
    } else {
      throw new Error('未授权App')
    }
  }
}
