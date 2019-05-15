import { Channel } from 'amqplib';
import { Task, TaskAdapter, Names } from '../..';

export const namesFor = (name: keyof any): Names => ({
  trigger: `${String(name)}:trigger`,
  queue: `${String(name)}:queue`,
  outcome: `${String(name)}:outcome`
})

const rnd = () => parseInt(`${Math.random()}`.substr(2)).toString(36).padStart(11, '0')
const uuid = () => `${rnd()}${rnd()}`

export const prepareTask = (
  channel: Channel,
  taskName: string
) => {
  const names = namesFor(taskName)
  return Promise.all([
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
}

export const adaptTask = async <Tsk extends Task<any, any>>
  (
    channel: Channel,
    taskName: string
  ): Promise<TaskAdapter<Tsk>> => {

  const names = namesFor(taskName)
  await prepareTask(channel, taskName)

  const triggerTask: TaskAdapter<Tsk>['triggerTask'] = async (
    t,
    opts = {}) => {
    const taskId = opts.taskId || uuid()
    channel.publish(names.trigger, '', Buffer.from(JSON.stringify(t)), {
      correlationId: taskId,
      headers: {
        taskId
      }
    })
    return taskId
  }

  const probeOut: TaskAdapter<Tsk>['probeOut'] = async (
    sink,
    opts = {}
  ) => {

    const { taskId, probeName } = opts
    const types = Array.from(new Set(opts.types))
    const { queue: probeQ } = await channel.assertQueue(`probe(${taskName}>${probeName || ''}):${uuid()}`, {
      exclusive: true,
      autoDelete: true
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
          // console.error(e)
          channel.nack(msg)
          // channel.nack(msg)
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

  const consume: TaskAdapter<Tsk>['consume'] = async (task) => {

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

  const request: TaskAdapter<Tsk>['request'] = req => new Promise(
    async (resolve, _reject) => {
      const taskId = uuid()
      const unsub = await probeOut(outcome => {
        unsub()
        resolve(outcome)
      }, {
          taskId
        })
      await triggerTask(req, { taskId })
    })

  return Object.assign<
    TaskAdapter<Tsk>['request'],
    Pick<TaskAdapter<Tsk>,
      | 'consume'
      | 'triggerTask'
      | 'probeOut'
      | 'taskName'
      | 'request'>
  >(request, {
    taskName,
    triggerTask,
    probeOut,
    consume,
    request
  })
}