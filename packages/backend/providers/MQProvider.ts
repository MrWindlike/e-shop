import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import MQ from 'shared/src/utils/mq'

export default class MQProvider {
  constructor(protected app: ApplicationContract) {
    this.app = app
  }

  public register() {
    // Register your own bindings
    this.app.container.singleton('Adonis/Utils/MQ', () => {
      const config = this.app.container.resolveBinding('Adonis/Core/Config').get('mq', {})

      return new MQ(config)
    })
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
