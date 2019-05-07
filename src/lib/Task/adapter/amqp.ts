import { Channel } from 'amqplib';
import { Task, /* OutcomeOf, */ SomeOutcomeOf } from '../';

export interface Names {
  trigger: string
  queue: string
  outcome: string
}
// export interface More<Tsk extends Task<any, any>> {
//   names: Names
// }
// export type Probes = 'trigger' | 'outcome'

const namesFor = (name: string): Names => ({
  trigger: `${name}:trigger`,
  queue: `${name}:queue`,
  outcome: `${name}:outcome`
})

const rnd = () => parseInt(`${Math.random()}`.substr(2)).toString(36).padStart(11, '0')
const uuid = () => `${rnd()}${rnd()}`

export const adapt = async <Tsk extends Task<any, any>>
  (channel: Channel, name: string)/* : Promise<More<Tsk>> */ => {

  type Trigger = Tsk extends Task<infer T, any> ? T : never
  type Outcomes = Tsk extends Task<any, infer O> ? O : never
  //type OutcomesOf = OutcomeOf<Outcomes>
  const names = namesFor(name)
  const { trigger, outcome, queue } = names

  await Promise.all([
    channel.assertExchange(trigger, 'headers', {
      durable: true
    }),
    channel.assertExchange(outcome, 'headers', {
      durable: true
    }),
    channel.assertQueue(queue, {
      durable: true
    }),
    channel.bindQueue(queue, trigger, '')
  ])
  const triggerTask = async (t: Trigger) => {
    const id = uuid()
    channel.publish(trigger, '', Buffer.from(JSON.stringify(t)), {
      correlationId: id
    })
    return id
  }

  const probe = async <Ks extends keyof Outcomes>(
    sink: (msg: SomeOutcomeOf<Outcomes, Ks>[Ks]) => unknown,
    opts: {
      types?: Ks[]
      id?: string
      probeName?: string
    } = {}
  ) => {
    const { types = [], id, probeName } = opts
    const { queue: probeQ } = await channel.assertQueue(`probe(${name}>${probeName || ''}):${uuid()}`, {
      exclusive: true
    })

    const { consumerTag } = await channel.consume(probeQ, async msg => {
      if (msg) {
        try {
          const msgType = msg.properties.headers.outcome
          await sink({
            t: msgType,
            p: JSON.parse(msg.content.toString())
          })
          channel.ack(msg)
        } catch (e) {
          console.error(e)
          channel.nack(msg)
        }
      }
    })
    const qArgs = {
      ...types.length
        ? types.reduce((args: any, t: any) => ({ ...args, [t]: true }), { 'x-match': 'any' })
        : {},
      ...id
        ? { id }
        : {}
    }
    await channel.bindQueue(probeQ, outcome, '', qArgs)

    return () => Promise.resolve(channel.cancel(consumerTag))
  }

  const consume = async (task: Tsk) => {

    const { queue: consumeQ } = await channel.assertQueue(`consumer:${uuid()}`, {
      exclusive: true
    })

    const { consumerTag } = await channel.consume(consumeQ, async msg => {
      if (msg) {
        try {
          const triggerArg = JSON.parse(msg.content.toString())
          // console.log(`consuming:${name}`, triggerArg)
          const _ = await task(triggerArg)
          // console.log(`resp:${name}`, _)
          /* const p = */ await channel.publish(outcome, '', Buffer.from(JSON.stringify(_.p)), {
            correlationId: msg.properties.correlationId,
            headers: {
              taskId: msg.properties.correlationId,
              [_.t]: true,
              outcome: _.t
            }
          })
          channel.ack(msg)
        } catch (e) {
          console.error(e)
          channel.nack(msg)
        }
      }
    })
    channel.bindQueue(consumeQ, trigger, '')

    return () => Promise.resolve(channel.cancel(consumerTag))
  }
  return {
    names,
    triggerTask,
    probe,
    consume
  }
}