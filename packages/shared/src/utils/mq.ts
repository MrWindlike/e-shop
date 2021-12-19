import amqplib, { Connection } from 'amqplib';

class MQ {
  public url: string;
  public mq: Promise<Connection>;

  constructor(options) {
    this.url = options.url;
    this.mq = amqplib.connect(this.url);
  }

  public async send(name, info) {
    const mq = await this.mq;
    const channel = await mq.createChannel();

    try {
      await channel.assertQueue(name);
      await channel.sendToQueue(
        name,
        Buffer.from(JSON.stringify(info)),
      );
    } catch (err) {
      console.log(err);
    } finally {
      await channel.close();
    }
  }

  public async on(name, callback) {
    const mq = await this.mq;
    const channel = await mq.createChannel();

    await channel.assertQueue(name);
    channel.consume(name, async (info) => {
      const result = await callback(info);

      if (result !== false) {
        channel.ack(info);
      }
    });
  }
}

export default MQ;
