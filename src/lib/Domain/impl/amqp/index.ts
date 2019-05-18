import { Channel } from 'amqplib';
import { DomainTasks, GetOutTypeName, DomainWire } from '../..';
import { adaptTask, namesFor, prepareTask } from '../../../Task/impl/amqp/index';
import { TaskAdapter } from '../../../Task';

export const adaptDomain = async <Dom extends DomainTasks>(
  channel: Channel
) => {
  type Holder = { [TN in keyof Dom]: Promise<TaskAdapter<Dom[TN]>> }
  const domain: Holder = {} as Holder
  const get = async <N extends string & keyof Dom>(taskName: N): Promise<TaskAdapter<Dom[N]>> =>
    domain[taskName] || (domain[taskName] = adaptTask(channel, taskName))
  const wire = async<
    From extends string & keyof Dom,
    OT extends GetOutTypeName<Dom, From>,//Dom[From] extends Task<any, infer O> ? keyof O : never,
    To extends string & keyof Dom
  >(
    ...args: DomainWire<Dom, From, OT, To>
  ) => {
    const [from, outTypeName, to] = args
    prepareTask(channel, from)
    prepareTask(channel, to)
    const { outcome } = namesFor(from)
    const { trigger } = namesFor(to)
    console.log(`[${outcome}.${outTypeName}] => [${trigger}]`);
    await channel.bindExchange(trigger, outcome, '', { outcome: outTypeName })

  }
  return {
    get,
    wire
  }
}

