export declare const domain: {
    probeIn: <SigName extends "b" | "c" | "a">(sigName: SigName, probe: (signal: {
        a: number;
        b: string;
        c: boolean;
    }[SigName], meta: import("./ChannelsEE").Meta) => unknown) => () => import("events").EventEmitter;
    probeOut: <SigName extends "b" | "c" | "a">(sigName: SigName, probe: (signal: {
        a: number;
        b: string;
        c: boolean;
    }[SigName], meta: import("./ChannelsEE").Meta) => unknown) => () => import("events").EventEmitter;
    probeInAll: (probe: <SigName extends "b" | "c" | "a">(sigName: SigName, signal: {
        a: number;
        b: string;
        c: boolean;
    }[SigName], meta: import("./ChannelsEE").Meta) => unknown) => () => import("events").EventEmitter;
    probeOutAll: (probe: <SigName extends "b" | "c" | "a">(sigName: SigName, signal: {
        a: number;
        b: string;
        c: boolean;
    }[SigName], meta: import("./ChannelsEE").Meta) => unknown) => () => import("events").EventEmitter;
    signalOut: <SigName extends "b" | "c" | "a">(sigName: SigName, signal: {
        a: number;
        b: string;
        c: boolean;
    }[SigName], meta?: import("./ChannelsEE").Meta) => void;
    signalIn: <SigName extends "b" | "c" | "a">(sigName: SigName, signal: {
        a: number;
        b: string;
        c: boolean;
    }[SigName], meta?: import("./ChannelsEE").Meta) => void;
    unsubscribe: {
        b: () => unknown;
        c: () => unknown;
        a: () => unknown;
    };
};
//# sourceMappingURL=_test.d.ts.map