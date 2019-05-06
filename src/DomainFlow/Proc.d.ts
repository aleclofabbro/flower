export type Srv<Res, Req = void> =
  Req extends void
  ? () => Promise<Res>
  : (req: Req) => Promise<Res>

export type Headers = {
  [name: string]: string
}
type OutcomeOf<Outcomes> = {
  [P in keyof Outcomes]: { t: P, p: Outcomes[P] }
}[keyof Outcomes]

export type TaskOutcomes = {
  [outcomeType: string]: any
}

export type Task<
  Trigger,
  Outcomes extends TaskOutcomes
  > = <O extends keyof Outcomes>(trigger: Trigger) => Promise<OutcomeOf<Outcomes>>

export type TaskNodeGen<
  Trigger,
  Outcomes extends TaskOutcomes
  > =
  <HT extends (keyof Trigger)[], HO extends (keyof Outcomes)[]>
    (ho?: HO, ht?: HT) => Task<Trigger, Outcomes>

