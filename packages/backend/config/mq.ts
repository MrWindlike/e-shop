import Env from '@ioc:Adonis/Core/Env'

export default {
  url: Env.get('RABBIT_URL'),
}
