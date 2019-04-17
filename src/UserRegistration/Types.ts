export type Email = string
export type UserName = string
export type RegistrationRequestId = string

export enum RegistrationRequestFailReason {
  UserNameUnavailable,
  ContactAlreadyRegistered,
}

export enum ConfirmationRequestFailReason {
  NoMatch,
  RegistrationAlreadyConfirmed,
}

export interface UserRegistrationRequest {
  userName: UserName
  email: Email
}

export interface HasRegistrationRequestFailReason {
  reason: RegistrationRequestFailReason
}

export interface HasConfirmationRequestFailReason {
  reason: ConfirmationRequestFailReason
}

export interface HasRegistrationRequestId {
  registrationRequestId: RegistrationRequestId
}

export type RegistrationRecord = UserRegistrationRequest & HasRegistrationRequestId
export type RegistrationConfirmRecord = RegistrationRecord & { performedAttempts: number }

export type ScheduleConfirmationTimeout = RegistrationConfirmRecord & { timeout: number, u?: 's' | 'm' | 'h' | 'd' }

