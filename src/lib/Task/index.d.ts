export type Srv<Res, Req = void> =
  Req extends void
  ? () => Promise<Res>
  : (req: Req) => Promise<Res>


export type OutcomeOf<Outcomes> = {
  [P in keyof Outcomes]: { t: P, p: Outcomes[P] }
}[keyof Outcomes]

export type SomeOutcomeOf<Outcomes, Types extends keyof Outcomes> = {
  [P in Types]: { t: P, p: Outcomes[P] }
}

export type TaskOutcomes = {
  [outcomeType: string]: any
}

export type Task<
  Trigger,
  Outcomes extends TaskOutcomes
  > = <O extends keyof Outcomes>(trigger: Trigger) => Promise<OutcomeOf<Outcomes>>

export type _REMOVE_ME_MAYBE_TaskNodeGen<ForTask> =
  ForTask extends Task<infer Trigger, infer Outcomes>
  ? <HT extends (keyof Trigger)[], HO extends (keyof Outcomes)[]>
    (ho?: HO, ht?: HT) => Task<Trigger, Outcomes>
  : never

export interface TaskAdapter<
  Tsk extends Task<any, any>,
  Trigger = Tsk extends Task<infer T, any> ? T : never,
  Outcomes = Tsk extends Task<any, infer O> ? O : never
  > {
  (req: Trigger): Promise<OutcomeOf<Outcomes>>


  taskName: string

  triggerTask: (t: Trigger, opts?: {
    taskId?: string | undefined;
  }) => Promise<string>

  probeOut: <Ks extends keyof Outcomes>(
    sink: (msg: SomeOutcomeOf<Outcomes, Ks>[Ks]) => unknown,
    opts?: {
      types?: Ks[]
      taskId?: string
      probeName?: string
    }) => Promise<() => unknown>

  consume: (task: Tsk) => Promise<() => unknown>

  request: (req: Trigger) => Promise<OutcomeOf<Outcomes>>
}
export interface Names {
  trigger: string
  queue: string
  outcome: string
}

// export type Wire<
//   From extends Task<any, any>,
//   OutType extends From extends Task<any, infer O> ? keyof O : string,
//   To extends Task<Msg, any>,
//   Msg = From extends Task<any, infer O> ? O[OutType] : never,
//   > =
//   Msg extends never ? never : OutType extends never ? never :
//   [From, OutType, To]

