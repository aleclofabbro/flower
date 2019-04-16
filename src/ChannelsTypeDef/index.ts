// export type Msgs<M> = {
//   [T in keyof M]: M[T] & { type: T }
// }

export interface Meta { id: string, msgName: string }
export type Handler<T> = ((_: T, meta: Meta) => any)
export type MsgOrHandler<T> = T | Handler<T>

export type UnsubOrId<
  MH,
  MsgMap,
  MsgName extends keyof MsgMap
  > = MH extends Handler<MsgMap[MsgName]> ? () => void : Meta

export interface Channels<MsgMap extends { [msgName: string]: any }> {

  <MsgName extends keyof MsgMap, MH extends MsgOrHandler<MsgMap[MsgName]>>
    (msgName: MsgName, msgOrHandler: MH): UnsubOrId<MH, MsgMap, MsgName>

}


// declare const x: Channels<{ ass: Date }>;

// const z = x('ass', (_, __) => { })
// const t = x('ass', (_) => { })
// const k = x('ass', new Date)

