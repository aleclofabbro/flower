
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
