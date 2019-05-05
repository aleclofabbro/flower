export type Srv<Req, Outcomes> = (req: Req) => Promise<OutcomeOf<Outcomes>>
export type ProcId = string

export interface BaseHeaders {
  procId: ProcId
  fromProcId: ProcId
  fromName: string
}

type OutcomeOf<Outcomes> = {
  [P in keyof Outcomes]: { t: P, p: Outcomes[P] }
}[keyof Outcomes]

export type TaskOutcomes = {
  [outcomeType: string]: any
}
export type StartNode<Starter> = (head: BaseHeaders, req: Starter) => Promise<unknown>
export type TaskNode<Outcomes extends TaskOutcomes> = (head: BaseHeaders) => Promise<OutcomeOf<Outcomes>>
export type Tasks = {
  [name: string]: TaskNode<any>
}

export interface Proc<
  _StartNode extends StartNode<any>,
  _Tasks extends Tasks
  > {
  start: _StartNode
  tasks: _Tasks
}