import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import amqplib from 'amqplib';

class MQ {
   constructor(app, options) {
    this.app = app
    this.url = options.url
    this.mq = amqplib.connect(this.url)
  }

  async send(name, info) {
    const mq = await this.mq;
    const channel = await mq.createChannel()

    await channel.assertQueue(name);
    await channel.sendToQueue(name, Buffer.from(JSON.stringify(info)))
  }

  async on(name, callback) {
    const mq = await this.mq;
    const channel = await mq.createChannel()

    await channel.assertQueue(name)
    channel.consume(name, async (info)=> {
      const result = await callback(info)

      if (result !== false) {
        channel.ack(info)
      }
    })
  }
}

export default class MQProvider {
  constructor(protected app: ApplicationContract) {
    this.app = app
  }

  public register() {
    // Register your own bindings
    this.app.container.singleton('Adonis/Utils/MQ', ()=> {
      const config = this.app.container.resolveBinding('Adonis/Core/Config').get('mq', {})

      return new MQ(this.app, config)
    })
  }

  public async boot() {
    // IoC container is ready
    const mq = require('@ioc:Adonis/Utils/MQ');

    mq.on('distribution', (info) => {
      console.log(info.content.toString())
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
