
export type Email = string
export type UserName = string

export type Id = string
export interface ProcessRecord {
  id: Id
  email: Email
  userName: UserName
  sartedAt: Date
  attempts: Date[]
  maxAttempts: number
  waitHours: number
}
