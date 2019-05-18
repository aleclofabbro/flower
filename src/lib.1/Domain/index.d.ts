import { Task } from '../Task';

export type DomainTasks = {
  [name: string]: Task<any, any>
}


export type DomainWire<
  Dom extends DomainTasks,
  From extends keyof Dom,
  OutTypeName extends GetOutTypeName<Dom, From>,//Dom[From] extends Task<any, infer O> ? keyof O : never,
  To extends keyof Dom,
  OutType = Dom[From] extends Task<any, infer O> ? O[OutTypeName] : never,
  InType = Dom[To] extends Task<infer I, any> ? I : never
  > = OutType extends InType
  ? [From, OutTypeName, To]
  : never

export type GetOutTypeName<
  Dom extends DomainTasks,
  TaskName extends keyof Dom
  > = Dom[TaskName] extends Task<any, infer O> ? keyof O : never