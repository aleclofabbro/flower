import { EventEmitter } from 'events';
import { DomainFlow, Flow } from './DomainFlow';
export interface Meta {
    id: string;
}
interface Opts<Msgs> {
    shortCircuit?: (keyof Msgs)[] | boolean;
}
export declare const createDomain: <Msgs, Flw extends Flow<Msgs>>(domainFlow: DomainFlow<Msgs, Flw>, opts?: Opts<Msgs>) => {
    probeIn: <MsgName extends keyof Msgs>(msgName: MsgName, probe: (message: Msgs[MsgName], meta: Meta) => unknown) => () => EventEmitter;
    probeOut: <MsgName extends keyof Msgs>(msgName: MsgName, probe: (message: Msgs[MsgName], meta: Meta) => unknown) => () => EventEmitter;
    probeInAll: (probe: <MsgName extends keyof Msgs>(msgName: MsgName, message: Msgs[MsgName], meta: Meta) => unknown) => () => EventEmitter;
    probeOutAll: (probe: <MsgName extends keyof Msgs>(msgName: MsgName, message: Msgs[MsgName], meta: Meta) => unknown) => () => EventEmitter;
    messageOut: <MsgName extends keyof Msgs>(msgName: MsgName, message: Msgs[MsgName], meta?: Meta) => void;
    messageIn: <MsgName extends keyof Msgs>(msgName: MsgName, message: Msgs[MsgName], meta?: Meta) => void;
    unsubscribe: { [N in keyof Msgs]: () => unknown; };
};
export {};
//# sourceMappingURL=ChannelsEE.d.ts.map