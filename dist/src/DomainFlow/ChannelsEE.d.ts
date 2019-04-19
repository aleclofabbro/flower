import { DomainFlow, Flow } from './DomainFlow';
export interface Meta {
    id: string;
}
export interface Opts<Msgs> {
    shortCircuit?: (keyof Msgs)[] | boolean;
}
export interface Domain<Msgs, Flw extends Flow<Msgs>> {
    probeIn: <MsgName extends keyof Msgs>(msgName: MsgName, probe: Probe<Msgs, MsgName>) => () => undefined;
    probeOut: <MsgName extends keyof Msgs>(msgName: MsgName, probe: Probe<Msgs, MsgName>) => () => undefined;
    probeInAll: (probe: ProbeAll) => () => undefined;
    probeOutAll: (probe: ProbeAll) => () => undefined;
    messageOut: <MsgName extends keyof Msgs>(msgName: MsgName, message: Msgs[MsgName], meta?: Meta) => void;
    messageIn: <MsgName extends keyof Msgs>(msgName: MsgName, message: Msgs[MsgName], meta?: Meta) => void;
    unsubscribe: {
        [N in keyof Msgs]: () => unknown;
    };
    domainFlow: DomainFlow<Msgs, Flw>;
}
declare type Probe<Msgs, MsgName extends keyof Msgs> = (message: Msgs[MsgName], meta: Meta) => unknown;
declare type ProbeAll = <Msgs, MsgName extends keyof Msgs>(msgName: MsgName, message: Msgs[MsgName], meta: Meta) => unknown;
export declare const createDomain: <Msgs, Flw extends Flow<Msgs>>(domainFlow: DomainFlow<Msgs, Flw>, opts?: Opts<Msgs>) => Domain<Msgs, Flw>;
export {};
//# sourceMappingURL=ChannelsEE.d.ts.map