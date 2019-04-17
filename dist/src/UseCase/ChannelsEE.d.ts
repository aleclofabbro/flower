import { EventEmitter } from 'events';
import { UseCase, Flow } from './UseCase';
export interface Meta {
    id: string;
}
interface Opts<Sigs> {
    shortCircuit?: (keyof Sigs)[] | boolean;
}
export declare const createDomain: <Sigs, Flw extends Flow<Sigs>>(useCase: UseCase<Sigs, Flw>, opts?: Opts<Sigs>) => {
    probeIn: <SigName extends keyof Sigs>(sigName: SigName, probe: (signal: Sigs[SigName], meta: Meta) => unknown) => () => EventEmitter;
    probeOut: <SigName extends keyof Sigs>(sigName: SigName, probe: (signal: Sigs[SigName], meta: Meta) => unknown) => () => EventEmitter;
    probeInAll: (probe: <SigName extends keyof Sigs>(sigName: SigName, signal: Sigs[SigName], meta: Meta) => unknown) => () => EventEmitter;
    probeOutAll: (probe: <SigName extends keyof Sigs>(sigName: SigName, signal: Sigs[SigName], meta: Meta) => unknown) => () => EventEmitter;
    signalOut: <SigName extends keyof Sigs>(sigName: SigName, signal: Sigs[SigName], meta?: Meta) => void;
    signalIn: <SigName extends keyof Sigs>(sigName: SigName, signal: Sigs[SigName], meta?: Meta) => void;
    unsubscribe: { [N in keyof Sigs]: () => unknown; };
};
export {};
//# sourceMappingURL=ChannelsEE.d.ts.map