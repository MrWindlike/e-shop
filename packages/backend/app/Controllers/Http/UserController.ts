import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import userSchema from 'shared/lib/schemas/user'
import { Role } from 'shared/lib/const/role'
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
        return buildResponse(null, 'Account already exists', -1)
      }
    } catch ({ messages: { errors } }) {
      if (errors.length) {
        ctx.response.status(406)

        return buildResponse(null, errors[0].message, -1)
      }
    }

    try {
      const result = await User.create({
        account: params.account,
        password: params.password,
        role: Role.User,
      })

      return result
    } catch (error) {
      ctx.response.status(500)

      return buildResponse(null, error.message, -1)
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
        const token = await ctx.auth.use('user').generate(admins[0])

        return buildResponse(token)
      }

      return ctx.response.badRequest(buildResponse(null, 'Invalid credentials', -1))
    } catch {
      return ctx.response.badRequest(buildResponse(null, 'Invalid credentials', -1))
    }
  }

  public async list(ctx: HttpContextContract) {
    const users = await User.all()

    return users
  }
}
