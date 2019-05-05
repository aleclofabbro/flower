import { ProcId } from '../DomainFlow/Proc';

export type Email = string
export type UserName = string

export interface Starter {
  userName: UserName
  email: Email
}

export interface State extends Starter {
  procId: ProcId
  sartedAt: Date
  attempts: Date[]
  maxAttempts: number
  waitHours: number
}
