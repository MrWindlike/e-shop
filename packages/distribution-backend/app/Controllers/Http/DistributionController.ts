import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { buildResponse } from 'App/Utils/builder'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { Role } from 'shared/src/const/role'

export default class DistributionController {
  public async login(ctx: HttpContextContract) {
    const params = ctx.request.body()

    try {
      const admins = await User.query()
        .where({
          account: params.account,
          role: Role.Distribution,
        })
        .limit(1)

      if (admins.length && (await Hash.verify(admins[0].password, params.password))) {
        const token = await ctx.auth.use('distribution').generate(admins[0], { expiresIn: '1days' })

        return buildResponse(token, '登录成功')
      }

      return ctx.response.badRequest(buildResponse(null, '账号或密码不正确', -1))
    } catch(error) {
      return ctx.response.badRequest(buildResponse(null, '账号或密码不正确', -1, error))
    }
  }

  public async logout(ctx: HttpContextContract) {
    try {
      await ctx.auth.use('distribution').revoke()

      return buildResponse(null, '退出登录成功')
    } catch {
      return ctx.response.internalServerError(buildResponse(null, '退出登录失败', -1))
    }
  }

  public async show(ctx: HttpContextContract) {
    return buildResponse(ctx.auth.user)
  }
}
