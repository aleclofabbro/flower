export interface Meta {
    id: string;
    msgName: string;
}
export declare type Handler<T> = ((_: T, meta: Meta) => any);
export declare type MsgOrHandler<T> = T | Handler<T>;
export declare type UnsubOrId<MH, MsgMap, MsgName extends keyof MsgMap> = MH extends Handler<MsgMap[MsgName]> ? () => void : Meta;
export interface Channels<MsgMap extends {
    [msgName: string]: any;
}> {
    <MsgName extends keyof MsgMap, MH extends MsgOrHandler<MsgMap[MsgName]>>(msgName: MsgName, msgOrHandler: MH): UnsubOrId<MH, MsgMap, MsgName>;
}
//# sourceMappingURL=index.d.ts.map