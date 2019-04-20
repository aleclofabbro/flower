import { EventEmitter } from 'events';
import { DomainFlow, Flow, Follows } from './DomainFlow';

const rnd = () => parseInt(`${Math.random()}`.substr(2)).toString(36)
const id = () => `${rnd()}${rnd()}`.padStart(22, 'x')
export interface Meta {
  id: string
}
const newMeta = (): Meta => ({
  id: id()
})

// type TypeUnion<T> = keyof T extends infer P ? // Introduce an extra type parameter P to distribute over
//   P extends any ? { msgName: P, msg: T[P] } :  // Take each P and create the union member
//   never : never;

type TypeUnion<T> = {
  [P in keyof T]: { msgName: P, msg: T[P] }
}[keyof T]
const SIG_ALL_NAME = '*'
// type EEType<Msgs> = StrictEventEmitter<EventEmitter, {
//   [T in keyof Msgs]: (msg: Msgs[T], meta: Meta) => void
// } & {
//   '*': (_: TypeUnion<Msgs>, meta: Meta) => void,
// }>


export interface Opts<Msgs> {
  shortCircuit?: (keyof Msgs)[] | boolean
}
export interface EE<Msgs> {
  emit: <K extends keyof Msgs>(name: K, msg: Msgs[K], meta?: Meta) => Meta

  on: <K extends keyof Msgs>(name: K, handl: (msg: Msgs[K], meta: Meta) => unknown) => () => unknown
  all: (handl: (msg: TypeUnion<Msgs>, meta: Meta) => unknown) => () => unknown
}
export interface Domain<Msgs, Flw extends Flow<Msgs>> {
  input: EE<Msgs>
  output: EE<Msgs>
  unsubscribe: { [N in keyof Msgs]: () => unknown; }
  domainFlow: DomainFlow<Msgs, Flw>
}

export const createDomain = <Msgs extends { [k: string]: any }, Flw extends Flow<Msgs>>(domainFlow: DomainFlow<Msgs, Flw>, opts: Opts<Msgs> = {}): Domain<Msgs, Flw> => {
  type MsgNames = keyof Msgs
  // type UCase = DomainFlow<Msgs, Flw>
  const eeOut = new EventEmitter()
  const eeIn = new EventEmitter()

  const followsOut = <MsgName extends MsgNames>(msgName: MsgName, msg: Msgs[MsgName], meta: Meta) => {
    // if ('string' !== typeof msgName) { throw `messageOut : Only string msgNames - msgName:${msgName} message:${msg}` }
    let target = eeOut
    if (
      opts.shortCircuit &&
      (
        opts.shortCircuit === true ||
        opts.shortCircuit.find(_ => msgName === _)
      )
    ) {
      target = eeIn
    }
    target.emit(SIG_ALL_NAME, { msgName, msg }, meta)
    target.emit(
      //@ts-ignore
      msgName,
      msg, meta)
  }


  const msgNames = Object.keys(domainFlow) as MsgNames[]
  const unsubscribe = msgNames.reduce<{ [N in MsgNames]: () => unknown }>((unsubs, msgName) => {
    type MsgName = typeof msgName
    const handler = async (message: Msgs[MsgName], meta: Meta) => {

      const domainFlowNode = domainFlow[msgName]
      const follows: Follows<MsgName, Msgs, Flw> = (...args) => {
        const [fwMsgName, message] = args
        if (fwMsgName && message !== void 0) {
          followsOut(fwMsgName, message, meta)
        }
      }

      domainFlowNode(message, follows)

    }

    eeIn.on(
      //@ts-ignore
      msgName,
      handler)
    return Object.assign(
      unsubs, {
        [msgName]: () => eeIn.off(
          //@ts-ignore
          msgName,
          handler)
      })
  }, {} as { [N in MsgNames]: () => unknown })

  const xput = (_: EventEmitter): EE<Msgs> => ({
    //@ts-ignore
    on: (name, handler) => (_.on(name, handler), () => _.off(name, handler)),
    //@ts-ignore
    all: (handler) => (_.on('*', handler), () => _.off('*', handler)),
    emit: (nsgName, msg, meta = newMeta()) => {
      //@ts-ignore
      _.emit(nsgName, msg, meta)
      //@ts-ignore
      _.emit('*', { name: nsgName, msg }, meta)
      return meta
    }
  })

  return {
    input: xput(eeIn),
    output: xput(eeOut),
    unsubscribe,
    domainFlow
  }
}


