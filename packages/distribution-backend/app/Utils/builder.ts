import Env from '@ioc:Adonis/Core/Env'

export function buildPagination(pagination) {
  return {
    page: pagination.page || 1,
    perPage: pagination.perPage || 10,
  }
}

export function buildResponse(
  data: Record<string, any> | null = null,
  message = '',
  status = 0,
  detail = ''
) {
  return {
    data,
    message,
    status,
    detail: Env.get('NODE_ENV') === 'development' ? detail : null,
  }
}
