import { EventEmitter } from 'events';
import { DomainFlow, Flow, Follows } from './DomainFlow';

const rnd = () => parseInt(`${Math.random()}`.substr(2)).toString(36)
const id = () => `${rnd()}${rnd()}`.padStart(22, 'x')
export interface Meta {
  id: string
}
const newMeta = (): Meta => ({
  id: id()
}
)
const SIG_ALL_NAME = '*'
interface Opts<Msgs> {
  shortCircuit?: (keyof Msgs)[] | boolean
}
export const createDomain = <Msgs, Flw extends Flow<Msgs>>(domainFlow: DomainFlow<Msgs, Flw>, opts: Opts<Msgs> = {}) => {
  type MsgNames = keyof Msgs
  // type UCase = DomainFlow<Msgs, Flw>
  type Probe<MsgName extends keyof Msgs> = (message: Msgs[MsgName], meta: Meta) => unknown
  type ProbeAll = <MsgName extends keyof Msgs>(msgName: MsgName, message: Msgs[MsgName], meta: Meta) => unknown
  const outMessages = new EventEmitter()
  const outMessagesAll = new EventEmitter()
  const inMessages = new EventEmitter()
  const inMessagesAll = new EventEmitter()

  const messageOut = <MsgName extends MsgNames>(msgName: MsgName, message: Msgs[MsgName], meta = newMeta()) => {
    if ('string' !== typeof msgName) { throw `messageOut : Only string msgNames - msgName:${msgName} message:${message}` }
    let target = outMessages
    let targetAll = outMessagesAll
    if (opts.shortCircuit) {
      if (opts.shortCircuit === true || opts.shortCircuit.find(_ => msgName === _)) {
        target = inMessages
        targetAll = inMessagesAll
      }
    }
    targetAll.emit(SIG_ALL_NAME, msgName as string, message, meta)
    target.emit(msgName as string, message, meta)

  }

  const messageIn = <MsgName extends MsgNames>(msgName: MsgName, message: Msgs[MsgName], meta = newMeta()) => {
    if ('string' !== typeof msgName) { throw `messageIn : Only string msgNames - msgName:${msgName} message:${message}` }
    inMessagesAll.emit(SIG_ALL_NAME, msgName as string, message, meta)
    inMessages.emit(msgName as string, message, meta)
  }

  const probeFor = (emitter: EventEmitter) =>
    <MsgName extends MsgNames>(
      msgName: MsgName,
      probe: Probe<MsgName>
    ) => {
      if ('string' !== typeof msgName) { throw `probeFor : Only string msgNames - msgName:${msgName}` }
      const handler = (message: Msgs[MsgName], meta: Meta) => {
        probe(message, meta)
      }
      emitter.on(msgName as string, handler)
      return () => emitter.off(msgName as string, handler)
    }

  const probeForAll = (emitterAll: EventEmitter) =>
    (
      probe: ProbeAll
    ) => {
      const handler = <MsgName extends MsgNames>(msgName: MsgName, message: Msgs[MsgName], meta: Meta) => {
        probe(msgName, message, meta)
      }
      emitterAll.on(SIG_ALL_NAME, handler)
      return () => emitterAll.off(SIG_ALL_NAME, handler)
    }

  const probeIn = probeFor(inMessages)
  const probeOut = probeFor(outMessages)
  const probeInAll = probeForAll(inMessagesAll)
  const probeOutAll = probeForAll(outMessagesAll)

  const msgNames = Object.keys(domainFlow) as MsgNames[]
  const unsubscribe = msgNames.reduce<{ [N in MsgNames]: () => unknown }>((unsubs, msgName) => {
    type MsgName = typeof msgName
    const handler = async (message: Msgs[MsgName], meta: Meta) => {

      //inMessagesAll.emit(SIG_ALL_NAME, msgName, message, meta)
      const domainFlowNode = domainFlow[msgName]
      const follows: Follows<MsgName, Msgs, Flw> = (...args) => {
        if (args.length !== 0) {
          const [fwMsgName, message] = args
          messageOut(fwMsgName as any, message as any, meta)
        }
      }

      domainFlowNode(message, follows)

    }

    inMessages.on(msgName as string, handler)
    return Object.assign(
      unsubs, {
        [msgName]: () => inMessages.off(msgName as string, handler)
      })
  }, {} as { [N in MsgNames]: () => unknown })

  return {
    probeIn,
    probeOut,
    probeInAll,
    probeOutAll,
    messageOut,
    messageIn,
    unsubscribe
  }
}
