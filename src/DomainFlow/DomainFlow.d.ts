export type Follows<T extends keyof Messages, Messages, F extends Flow<Messages>> = (...followsTuple: FollowsTuple<T, Messages, F>) => unknown

export type DomainFlow<Messages, F extends Flow<Messages>> = {
  [T in keyof Messages]: (message: Messages[T], followup: Follows<T, Messages, F>) => unknown // NodeReturnType<T, Messages, F>
}

export type Flow<Messages> = {
  [T in keyof Messages]: []
  | [keyof Messages]
  | [keyof Messages, keyof Messages]
  | [keyof Messages, keyof Messages, keyof Messages]
}

export type FollowsTuple<T extends keyof Messages, Messages, FC extends Flow<Messages>> =
  // 0
  FC[T] extends [] ? [] :

  // 1
  FC[T] extends [keyof Messages] ?
  | [
    FC[T][0], Messages[FC[T][0]]
  ] :

  // 2
  FC[T] extends [keyof Messages, keyof Messages] ?
  | [
    FC[T][0], Messages[FC[T][0]]
  ]
  | [
    FC[T][1], Messages[FC[T][1]]
  ] :

  // 3
  FC[T] extends [keyof Messages, keyof Messages, keyof Messages] ?
  | [
    FC[T][0], Messages[FC[T][0]]
  ]
  | [
    FC[T][1], Messages[FC[T][1]]
  ]
  | [
    FC[T][2], Messages[FC[T][2]]
  ] :

  //
  never  
