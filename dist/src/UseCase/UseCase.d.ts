export declare type FollowUp<T extends keyof Signals, Signals, F extends Flow<Signals>> = (...followUpTuple: FollowUpTuple<T, Signals, F>) => unknown;
export declare type UseCase<Signals, F extends Flow<Signals>> = {
    [T in keyof Signals]: (signal: Signals[T], followup: FollowUp<T, Signals, F>) => unknown;
};
export declare type Flow<Signals> = {
    [T in keyof Signals]: [] | [keyof Signals] | [keyof Signals, keyof Signals] | [keyof Signals, keyof Signals, keyof Signals];
};
export declare type FollowUpTuple<T extends keyof Signals, Signals, FC extends Flow<Signals>> = FC[T] extends [] ? [] : FC[T] extends [keyof Signals] ? [FC[T][0], Signals[FC[T][0]]] : FC[T] extends [keyof Signals, keyof Signals] ? [FC[T][0], Signals[FC[T][0]]] | [FC[T][1], Signals[FC[T][1]]] : FC[T] extends [keyof Signals, keyof Signals, keyof Signals] ? [FC[T][0], Signals[FC[T][0]]] | [FC[T][1], Signals[FC[T][1]]] | [FC[T][2], Signals[FC[T][2]]] : never;
//# sourceMappingURL=UseCase.d.ts.map