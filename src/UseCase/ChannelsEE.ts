import { EventEmitter } from 'events';
import { UseCase, Flow, FollowUp } from './UseCase';

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
interface Opts<Sigs> {
  shortCircuit?: (keyof Sigs)[] | boolean
}
export const createDomain = <Sigs, Flw extends Flow<Sigs>>(useCase: UseCase<Sigs, Flw>, opts: Opts<Sigs> = {}) => {
  type SigNames = keyof Sigs
  // type UCase = UseCase<Sigs, Flw>
  type Probe<SigName extends keyof Sigs> = (signal: Sigs[SigName], meta: Meta) => unknown
  type ProbeAll = <SigName extends keyof Sigs>(sigName: SigName, signal: Sigs[SigName], meta: Meta) => unknown
  const outSignals = new EventEmitter()
  const outSignalsAll = new EventEmitter()
  const inSignals = new EventEmitter()
  const inSignalsAll = new EventEmitter()

  const signalOut = <SigName extends SigNames>(sigName: SigName, signal: Sigs[SigName], meta = newMeta()) => {
    if ('string' !== typeof sigName) { throw `signalOut : Only string sigNames - sigName:${sigName} signal:${signal}` }
    let target = outSignals
    let targetAll = outSignalsAll
    if (opts.shortCircuit) {
      if ('boolean' === typeof opts.shortCircuit || opts.shortCircuit.find(_ => sigName === _)) {
        target = inSignals
        targetAll = inSignalsAll
      }
    }
    targetAll.emit(SIG_ALL_NAME, sigName as string, signal, meta)
    target.emit(sigName as string, signal, meta)

  }

  const signalIn = <SigName extends SigNames>(sigName: SigName, signal: Sigs[SigName], meta = newMeta()) => {
    if ('string' !== typeof sigName) { throw `signalIn : Only string sigNames - sigName:${sigName} signal:${signal}` }
    inSignalsAll.emit(SIG_ALL_NAME, sigName as string, signal, meta)
    inSignals.emit(sigName as string, signal, meta)
  }

  const probeFor = (emitter: EventEmitter) =>
    <SigName extends SigNames>(
      sigName: SigName,
      probe: Probe<SigName>
    ) => {
      if ('string' !== typeof sigName) { throw `probeFor : Only string sigNames - sigName:${sigName}` }
      const handler = (signal: Sigs[SigName], meta: Meta) => {
        probe(signal, meta)
      }
      emitter.on(sigName as string, handler)
      return () => emitter.off(sigName as string, handler)
    }
  const probeForAll = (emitterAll: EventEmitter) =>
    (
      probe: ProbeAll
    ) => {
      const handler = <SigName extends SigNames>(sigName: SigName, signal: Sigs[SigName], meta: Meta) => {
        probe(sigName, signal, meta)
      }
      emitterAll.on(SIG_ALL_NAME, handler)
      return () => emitterAll.off(SIG_ALL_NAME, handler)
    }

  const probeIn = probeFor(inSignals)
  const probeOut = probeFor(outSignals)
  const probeInAll = probeForAll(inSignalsAll)
  const probeOutAll = probeForAll(outSignalsAll)

  const sigNames = Object.keys(useCase) as SigNames[]
  const unsubscribe = sigNames.reduce<{ [N in SigNames]: () => unknown }>((unsubs, sigName) => {
    type SigName = typeof sigName
    const handler = (signal: Sigs[SigName], meta: Meta) => {

      //inSignalsAll.emit(SIG_ALL_NAME, sigName, signal, meta)
      const useCaseNode = useCase[sigName]
      const followUp: FollowUp<SigName, Sigs, Flw> = (...args) => {
        if (args.length !== 0) {
          const [fwSigName, signal] = args
          signalOut(fwSigName as any, signal as any, meta)
        }
      }

      useCaseNode(signal, followUp)
    }

    inSignals.on(sigName as string, handler)
    return {
      ...unsubs,
      [sigName]: () => inSignals.off(sigName as string, handler)
    }
  }, {} as { [N in SigNames]: () => unknown })

  return {
    probeIn,
    probeOut,
    probeInAll,
    probeOutAll,
    signalOut,
    signalIn,
    unsubscribe
  }
}
