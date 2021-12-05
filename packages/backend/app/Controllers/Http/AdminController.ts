import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { buildResponse } from 'App/Utils/builder'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { Role } from 'shared/src/const/role'

export default class AdminController {
  public async login(ctx: HttpContextContract) {
    const params = ctx.request.body()

    try {
      const admins = await User.query()
        .where({
          account: params.account,
          role: Role.Admin,
        })
        .limit(1)

      if (admins.length && (await Hash.verify(admins[0].password, params.password))) {
        const token = await ctx.auth.use('admin').generate(admins[0])

        return buildResponse(token)
      }

      return ctx.response.badRequest(buildResponse(null, 'Invalid credentials', -1))
    } catch {
      return ctx.response.badRequest(buildResponse(null, 'Invalid credentials', -1))
    }
  }

  public async logout(ctx: HttpContextContract) {
    try {
      await ctx.auth.use('admin').revoke()

      return buildResponse(null, 'Logout successfully')
    } catch {
      return ctx.response.internalServerError(buildResponse(null, 'Logout failed', -1))
    }
  }

  public async show(ctx: HttpContextContract) {
    return buildResponse(ctx.auth.user)
  }
}
