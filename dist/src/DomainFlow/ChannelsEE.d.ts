import { DomainFlow, Flow } from './DomainFlow';
export interface Meta {
    id: string;
}
declare type TypeUnion<T> = {
    [P in keyof T]: {
        msgName: P;
        msg: T[P];
    };
}[keyof T];
export interface Opts<Msgs> {
    shortCircuit?: (keyof Msgs)[] | boolean;
}
export interface EE<Msgs> {
    emit: <K extends keyof Msgs>(name: K, msg: Msgs[K], meta?: Meta) => Meta;
    on: <K extends keyof Msgs>(name: K, handl: (msg: Msgs[K], meta: Meta) => unknown) => () => unknown;
    all: (handl: (msg: TypeUnion<Msgs>, meta: Meta) => unknown) => () => unknown;
}
export interface Domain<Msgs, Flw extends Flow<Msgs>> {
    input: EE<Msgs>;
    output: EE<Msgs>;
    unsubscribe: {
        [N in keyof Msgs]: () => unknown;
    };
    domainFlow: DomainFlow<Msgs, Flw>;
}
export declare const createDomain: <Msgs extends {
    [k: string]: any;
}, Flw extends Flow<Msgs>>(domainFlow: DomainFlow<Msgs, Flw>, opts?: Opts<Msgs>) => Domain<Msgs, Flw>;
export {};
//# sourceMappingURL=ChannelsEE.d.ts.map