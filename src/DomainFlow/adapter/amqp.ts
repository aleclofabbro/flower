import { Domain } from '../ChannelsEE';
import { Channel } from 'amqplib';
import { Flow } from '../DomainFlow';

export const adapt = async <Msgs, Flw extends Flow<Msgs>>(domain: Domain<Msgs, Flw>, channel: Channel) => {

  const exchanges = Object.keys(domain.domainFlow)
  const queues = (await Promise.all(exchanges.map(messageInName =>
    Promise.all([
      channel.assertExchange(messageInName, 'fanout'),
      channel.assertQueue('', {
        exclusive: true
      })
    ]).then(([_, queueResp]) => (channel.bindQueue(queueResp.queue, messageInName, ''), queueResp.queue))
      .then(queueName => (channel.consume(queueName, (amqpMsg) => {
        if (amqpMsg) {
          const message = JSON.parse(amqpMsg.content.toString())
          domain.input.emit(
            //@ts-ignore
            messageInName,
            message, { id: amqpMsg.properties.messageId })
        }
      }), [messageInName, queueName])))))
    .reduce((mapped: object, [messageInName, queueName]) => ({ ...mapped, [messageInName]: queueName }), {} as { [K in keyof Msgs]: string })
  domain.output.all(({ msg, msgName }, meta) => {
    //@ts-ignore
    channel.publish(msgName, '', Buffer.from(JSON.stringify(msg)), {
      messageId: meta.id
    })
  })
  console.log(queues)
  return queues

}