import { Channel } from 'amqplib';
import { DomainTasks } from '..';
import { adaptTask } from '../../Task/adapter/amqp';
import { TaskAdapter } from '../../Task';


// const rnd = () => parseInt(`${Math.random()}`.substr(2)).toString(36).padStart(11, '0')
// const uuid = () => `${rnd()}${rnd()}`

export const adaptDomain = async <Dom extends DomainTasks>(
  channel: Channel
) => {
  //@ts-ignore
  const domain: {
    [TN in keyof Dom]: Promise<TaskAdapter<Dom[TN]>>
  } = {}
  const get = async <N extends keyof Dom>(taskName: N): Promise<TaskAdapter<Dom[N]>> =>
    domain[taskName] || (domain[taskName] = adaptTask(channel, taskName as string))

  return {
    get
  }
}


/**
 * se deployTasks è un array parziale, TS non lo sa e
 * e torna un ogetto con props parziali
 * ma TS crede che ci sono tutte le props
 */
// export const adaptDomain = async <Dom extends DomainTasks>(
//   channel: Channel,
//   deployTasks: (keyof Dom)[]
// ) => {
//   const tasks = (await Promise.all(
//     Array.from(new Set(deployTasks))
//       .filter((_): _ is string => 'string' === typeof _)
//       .map(taskName =>
//         adaptTask(channel, taskName)
//           .then(adapter => ({ taskName, adapter }))
//       )
//   )).reduce<{
//     [TN in keyof Dom]: TaskAdapter<Dom[TN]>
//   }>((dom, _) => Object.assign(dom, { [_.taskName]: _.adapter }),
//     {} as {
//       [TN in keyof Dom]: TaskAdapter<Dom[TN]>
//     })
//   return tasks
// }