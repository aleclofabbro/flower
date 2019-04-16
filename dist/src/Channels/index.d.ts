export interface Meta {
    id: string;
    name: string;
}
export declare type Handler<T> = ((_: T, meta: Meta) => any);
export declare type MsgOrHandler<T> = T | Handler<T>;
export declare type UnsubOrId<MH, MsgMap, Name extends keyof MsgMap> = MH extends Handler<MsgMap[Name]> ? () => void : Meta;
export interface Channels<MsgMap extends {
    [n: string]: any;
}> {
    <Name extends keyof MsgMap, MH extends MsgOrHandler<MsgMap[Name]>>(name: Name, msgOrHandler: MH): UnsubOrId<MH, MsgMap, Name>;
}
//# sourceMappingURL=index.d.ts.map