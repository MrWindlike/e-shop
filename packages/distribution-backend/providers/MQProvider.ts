import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import MQ from 'shared/src/utils/MQ';

interface Info<Data> {
  type: 'commit' | 'rollback'
  data: Data
}

interface NotificationData {
  orderId: number
  content: string
}

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
    const mq = require('@ioc:Adonis/Utils/MQ')
    const Notification = require('App/Models/Notification').default

    mq.on('distribution', async (message) => {
      if (message) {
        console.log(message.content.toString())
        const info: Info<NotificationData> = JSON.parse(message.content.toString())

        if (info.type === 'commit') {
          await Notification.create({
            orderId: info.data.orderId,
            content: info.data.content,
          })
        }
      }
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
