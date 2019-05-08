import { Channel } from 'amqplib';
import { Task, /* OutcomeOf, */ SomeOutcomeOf, OutcomeOf } from '../';


export interface Names {
  trigger: string
  queue: string
  outcome: string
}

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

  await Promise.all([
    channel.assertExchange(names.trigger, 'headers', {
      durable: true
    }),
    channel.assertExchange(names.outcome, 'headers', {
      durable: true
    }),
    channel.assertQueue(names.queue, {
      durable: true
    }),
    channel.bindQueue(names.queue, names.trigger, '')
  ])
  const triggerTask = async (
    t: Trigger,
    opts: {
      taskId?: string
    } = {}) => {
    const taskId = opts.taskId || uuid()
    channel.publish(names.trigger, '', Buffer.from(JSON.stringify(t)), {
      correlationId: taskId
    })
    return taskId
  }

  const probeOut = async <Ks extends keyof Outcomes>(
    sink: (msg: SomeOutcomeOf<Outcomes, Ks>[Ks]) => unknown,
    opts: {
      types?: Ks[]
      taskId?: string
      probeName?: string
    } = {}
  ) => {
    const { taskId, probeName } = opts
    const types = Array.from(new Set(opts.types))
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
      ...taskId
        ? { taskId }
        : {}
    }
    await channel.bindQueue(probeQ, names.outcome, '', qArgs)

    return () => Promise.resolve(channel.cancel(consumerTag))
  }

  const consume = async (task: Tsk) => {

    const { consumerTag } = await channel.consume(names.queue, async msg => {
      if (msg) {
        try {
          const triggerArg = JSON.parse(msg.content.toString())
          const _ = await task(triggerArg)
          channel.ack(msg)

          await channel.publish(names.outcome, '', Buffer.from(JSON.stringify(_.p)), {
            correlationId: msg.properties.correlationId,
            headers: {
              taskId: msg.properties.correlationId,
              [_.t]: true,
              outcome: _.t
            }
          })
        } catch (e) {
          console.error(e)
          channel.nack(msg)
        }
      }
    })
    channel.bindQueue(names.queue, names.trigger, '')

    return () => Promise.resolve(channel.cancel(consumerTag))
  }

  const request = (req: Trigger) => new Promise<OutcomeOf<Outcomes>>(async (resolve, _reject) => {
    const taskId = uuid()
    const unsub = await probeOut(outcome => {
      unsub()
      //@ts-ignore
      resolve(outcome)
    }, {
        taskId
      })
    await triggerTask(req, { taskId })
  })

  return {
    names,
    triggerTask,
    probeOut,
    consume,
    request
  }
}