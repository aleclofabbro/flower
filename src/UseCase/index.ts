type UseCase<Signals, F extends Flow<Signals>> = {
  [T in keyof Signals]: (signal: Signals[T], followup: (...signal: NextSignalTuple<T, Signals, F>) => unknown) => unknown
}
export default UseCase

// type F = UseCase<{
//   a: number
//   b: string
//   c: boolean
// }, {
//   a: ['b', 'c']
//   b: ['c']
//   c: ['a', 'b']
// }>
// const f: F = {
//   a: (signal, followup) => followup('b', signal.toFixed(2)),
//   b: (signal, followup) => followup('c', signal.length === 0),
//   c: (signal, followup) => followup('a', signal ? 1 : 0),
// }

type Flow<Signals> = {
  [T in keyof Signals]: []
  | [keyof Signals]
  | [keyof Signals, keyof Signals]
  | [keyof Signals, keyof Signals, keyof Signals]
}

type NextSignalTuple<T extends keyof Signals, Signals, FC extends Flow<Signals>> =
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
