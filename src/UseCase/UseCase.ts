export type FollowUp<T extends keyof Signals, Signals, F extends Flow<Signals>> = (...followUpTuple: FollowUpTuple<T, Signals, F>) => unknown
export type NodeReturnType<T extends keyof Signals, Signals, F extends Flow<Signals>> =
  | void | Promise<void>
  | FollowUpTuple<T, Signals, F>[]
  | Promise<FollowUpTuple<T, Signals, F>[]>

export type UseCase<Signals, F extends Flow<Signals>> = {
  [T in keyof Signals]: (signal: Signals[T], followup: FollowUp<T, Signals, F>) => NodeReturnType<T, Signals, F>
}

// type TestUseCase = UseCase<{
//   a: number
//   b: string
//   c: boolean
// }, {
//   a: ['b', 'c']
//   b: ['c']
//   c: ['a', 'b']
// }>
// const tuc: TestUseCase = {
//   a: (signal, followup) => followup('b', signal.toFixed(2)),
//   b: (signal, followup) => followup('c', signal.length === 0),
//   c: (signal, followup) => followup('a', signal ? 1 : 0),
// }
// tuc.c

export type Flow<Signals> = {
  [T in keyof Signals]: []
  | [keyof Signals]
  | [keyof Signals, keyof Signals]
  | [keyof Signals, keyof Signals, keyof Signals]
}

export type FollowUpTuple<T extends keyof Signals, Signals, FC extends Flow<Signals>> =
  // 0
  FC[T] extends [] ? [] :

  // 1
  FC[T] extends [keyof Signals] ?
  | [
    FC[T][0], Signals[FC[T][0]]
  ] :

  // 2
  FC[T] extends [keyof Signals, keyof Signals] ?
  | [
    FC[T][0], Signals[FC[T][0]]
  ]
  | [
    FC[T][1], Signals[FC[T][1]]
  ] :

  // 3
  FC[T] extends [keyof Signals, keyof Signals, keyof Signals] ?
  | [
    FC[T][0], Signals[FC[T][0]]
  ]
  | [
    FC[T][1], Signals[FC[T][1]]
  ]
  | [
    FC[T][2], Signals[FC[T][2]]
  ] :

  //
  never  
