export declare const domain: {
    probeIn: <MsgName extends "b" | "c" | "a">(msgName: MsgName, probe: (message: {
        a: number;
        b: string;
        c: boolean;
    }[MsgName], meta: import("./ChannelsEE").Meta) => unknown) => () => import("events").EventEmitter;
    probeOut: <MsgName extends "b" | "c" | "a">(msgName: MsgName, probe: (message: {
        a: number;
        b: string;
        c: boolean;
    }[MsgName], meta: import("./ChannelsEE").Meta) => unknown) => () => import("events").EventEmitter;
    probeInAll: (probe: <MsgName extends "b" | "c" | "a">(msgName: MsgName, message: {
        a: number;
        b: string;
        c: boolean;
    }[MsgName], meta: import("./ChannelsEE").Meta) => unknown) => () => import("events").EventEmitter;
    probeOutAll: (probe: <MsgName extends "b" | "c" | "a">(msgName: MsgName, message: {
        a: number;
        b: string;
        c: boolean;
    }[MsgName], meta: import("./ChannelsEE").Meta) => unknown) => () => import("events").EventEmitter;
    messageOut: <MsgName extends "b" | "c" | "a">(msgName: MsgName, message: {
        a: number;
        b: string;
        c: boolean;
    }[MsgName], meta?: import("./ChannelsEE").Meta) => void;
    messageIn: <MsgName extends "b" | "c" | "a">(msgName: MsgName, message: {
        a: number;
        b: string;
        c: boolean;
    }[MsgName], meta?: import("./ChannelsEE").Meta) => void;
    unsubscribe: {
        b: () => unknown;
        c: () => unknown;
        a: () => unknown;
    };
};
//# sourceMappingURL=_test.d.ts.map