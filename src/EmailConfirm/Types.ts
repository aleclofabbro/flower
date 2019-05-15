import { CheckEmailConfirmation, ShouldConfirmationProcessStart, TakeInCharge } from './Tasks';
import { Task } from '../lib/Task';
import { DomainWire } from '../lib/Domain';

export type Email = string
export type UserName = string

export type Id = string

export enum Status {
  REQ_ACCEPTED = "REQ_ACCEPTED",
  WIP = "WIP",
  USER_CONFIRMED = "USER_CONFIRMED",
  TIMEOUT_CONFIRM = "TIMEOUT_CONFIRM"
}
export interface ProcessRecord {
  id: Id
  email: Email
  userName: UserName
  sartedAt: Date
  attempts: Date[]
  maxAttempts: number
  waitHours: number
  status: Status
}
export type BaseRecord = Pick<ProcessRecord, 'maxAttempts' | 'waitHours'>

export type EmailConfirmTasks = {
  checkEmailConfirmation: CheckEmailConfirmation
  shouldConfirmationProcessStart: ShouldConfirmationProcessStart
  takeInCharge: TakeInCharge
}

export const w1: DomainWire<
  EmailConfirmTasks,
  'takeInCharge',
  'InCharge',
  'shouldConfirmationProcessStart'
> = ['takeInCharge', 'InCharge', 'shouldConfirmationProcessStart']
export const w2: DomainWire<
  EmailConfirmTasks,
  'shouldConfirmationProcessStart',
  'ShouldStart',
  'shouldConfirmationProcessStart'
> = ['shouldConfirmationProcessStart', 'ShouldStart', 'shouldConfirmationProcessStart']
export const W4: DomainWire<
  { a: Task<{ a: number }, { a: { a: number } }> },
  'a',
  'a',
  'a'
> = ['a', 'a', 'a']
