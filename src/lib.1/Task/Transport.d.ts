export type ProcessId = string
export type TaskId = string
export type TaskName = string
export type TaskOutcomesTypeName = string
export type ProcessName = string
export type ProcessEventName = string
export type ProbeName = string

export type TaskPayload = any
export type ProcessPayload = any
export type ProcessEventPayload = any
export type TaskOutcomePayload = any

export type ProcessEventMsg = any

export interface WorkerResponse {
  o: TaskOutcomesTypeName
  p: TaskOutcomePayload
}

export interface TaskOutcomeMsg extends WorkerResponse {
  i: TaskId
}

export type Worker = (taskPayload: TaskPayload) => Promise<WorkerResponse>
export type TaskOutcomeSink = (taskOutcomeMsg: TaskOutcomeMsg) => unknown
export type ProcessEventSink = (processEventMsg: ProcessEventMsg) => unknown
export type Unsub = () => unknown

export interface TaskTriggerOptions {
  taskId?: TaskId
  sink?: TaskOutcomeSink
}

export interface ProcessTriggerOptions {
  processId?: ProcessId
  sink?: ProcessEventSink
}

export interface ProcessProbeOptions {
  processId?: ProcessId
}

export interface TaskProbeOutOptions {
  outcomes?: TaskOutcomesTypeName[]
  taskId?: TaskId
  probeName?: ProbeName
}

type DomainPreludeOperation<OperationFunction extends Function> =
/*   (domain: string) => */ OperationFunction

type TaskPreludeFunc<TaskFunction extends Function> = DomainPreludeOperation<
  (taskName: TaskName) => TaskFunction
>

type ProcessPreludeFunc<ProcessFunction extends Function> = DomainPreludeOperation<
  (processName: ProcessName) => ProcessFunction
>

export type ProcessTrigger = ProcessPreludeFunc<
  (processPayload: ProcessPayload) =>
    (options?: ProcessTriggerOptions) =>
      Promise<ProcessId>
>

export type ProcessProbe = ProcessPreludeFunc<
  (sink: ProcessEventSink) =>
    (options?: ProcessProbeOptions) =>
      Promise<Unsub>
>

export type TaskTrigger = TaskPreludeFunc<
  (taskPayload: TaskPayload) =>
    (options?: TaskTriggerOptions) =>
      Promise<TaskId>
>

export type TaskProbeOut = TaskPreludeFunc<
  (sink: TaskOutcomeSink) =>
    (options?: TaskProbeOutOptions) =>
      Promise<Unsub>
>

export type TaskConsume = TaskPreludeFunc<
  (worker: Worker) =>
    Promise<Unsub>
>
