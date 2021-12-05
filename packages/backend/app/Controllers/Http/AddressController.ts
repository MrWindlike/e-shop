import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import addressSchema from 'shared/src/schemas/address'
import { buildPagination, buildResponse } from 'App/Utils/builder'
import { createSchema } from 'App/Utils/schema'

export default class GoodController {
  public async list(ctx: HttpContextContract) {
    try {
      const params = ctx.request.qs()
      const pagination = buildPagination(params)
      const user = ctx.auth.user
      const addresses = (
        await Address.query()
          .whereNull('deleted')
          .where('userId', user?.id || 0)
          .paginate(pagination.page, pagination.perPage)
      ).toJSON()

      return buildResponse(
        {
          list: addresses.data,
          total: addresses.meta.total,
        },
        'Addresses fetched successfully'
      )
    } catch {
      return ctx.response.internalServerError(buildResponse(null, 'Addresses fetched fail', -1))
    }
  }

  public async create(ctx: HttpContextContract) {
    try {
      const schema = createSchema(addressSchema)

      await ctx.request.validate({
        schema,
        cacheKey: ctx.routeKey,
      })
    } catch ({ messages: { errors } }) {
      if (errors.length) {
        return ctx.response.badRequest(buildResponse(null, errors[0].message, -1))
      }
    }

    try {
      const params = ctx.request.body()
      const user = ctx.auth.user
      const result = await Address.create({
        ...params,
        userId: user?.id,
      })

      return buildResponse(result, 'Address created successfully')
    } catch (error) {
      return ctx.response.internalServerError(buildResponse(null, error.message, -1))
    }
  }

  public async update(ctx: HttpContextContract) {
    try {
      const id = ctx.params.id
      const user = ctx.auth.user
      const params = ctx.request.body()

      const [count] = await Address.query()
        .where('id', id)
        .where('userId', user?.id || 0)
        .update(params)

      if (count) {
        return buildResponse(null, 'Address updated successfully')
      } else {
        return ctx.response.badRequest(buildResponse(null, 'Address not found', -1))
      }
    } catch {
      return ctx.response.internalServerError(buildResponse(null, 'Address updated fail', -1))
    }
  }

  public async delete(ctx: HttpContextContract) {
    try {
      const id = ctx.params.id
      const user = ctx.auth.user

      const [count] = await Address.query()
        .where('id', id)
        .where('userId', user?.id || 0)
        .update({ deleted: true })

      if (count) {
        return buildResponse(null, 'Address deleted successfully')
      } else {
        return ctx.response.badRequest(buildResponse(null, 'Address not fount', -1))
      }
    } catch (error) {
      return ctx.response.internalServerError(buildResponse(null, error.message, -1))
    }
  }
}
