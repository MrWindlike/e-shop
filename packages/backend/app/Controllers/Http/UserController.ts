import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import userSchema from 'shared/src/schemas/user'
import { Role } from 'shared/src/const/role'
import { createSchema } from 'App/Utils/schema'
import { buildResponse } from 'App/Utils/builder'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UserController {
  public async create(ctx: HttpContextContract) {
    const params = ctx.request.body()

    try {
      const schema = createSchema(userSchema)

      const [users] = await Promise.all([
        User.query().where({ account: params.account, role: Role.User }),
        ctx.request.validate({
          schema,
          cacheKey: ctx.routeKey,
        }),
      ])

      if (users.length) {
        return ctx.response.badRequest(buildResponse(null, '账号已存在', -1))
      }
    } catch ({ messages: { errors } }) {
      if (errors.length) {
        ctx.response.status(406)

        return ctx.response.badRequest(buildResponse(null, errors[0].message, -1))
      }
    }

    try {
      const result = await User.create({
        account: params.account,
        password: params.password,
        role: Role.User,
      })
      const token = await ctx.auth.use('user').generate(result)

      return buildResponse(token, '创建账号成功', 0)
    } catch (error) {
      return ctx.response.internalServerError(
        buildResponse(null, '创建账号失败，请稍后再试', -1, error)
      )
    }
  }

  public async login(ctx: HttpContextContract) {
    const params = ctx.request.body()

    try {
      const admins = await User.query()
        .where({
          account: params.account,
          role: Role.User,
        })
        .limit(1)

      if (admins.length && (await Hash.verify(admins[0].password, params.password))) {
        const token = await ctx.auth.use('user').generate(admins[0], { expiresIn: '1days' })

        return buildResponse(token, '登录成功')
      }

      return ctx.response.badRequest(buildResponse(null, '账号或密码不正确', -1))
    } catch {
      return ctx.response.badRequest(buildResponse(null, '账号或密码不正确', -1))
    }
  }

  public async logout(ctx: HttpContextContract) {
    try {
      await ctx.auth.use('user').revoke()

      return buildResponse(null, '退出登录成功')
    } catch {
      return ctx.response.internalServerError(buildResponse(null, '退出登录失败', -1))
    }
  }

  public async list(ctx: HttpContextContract) {
    const users = await User.all()

    return users
  }

  public async show(ctx: HttpContextContract) {
    return buildResponse(ctx.auth.user)
  }
}
