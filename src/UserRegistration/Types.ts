export type Email = string
export type UserName = string
export type RegistrationRequestId = string

export enum May__UserName_Unavailable__Or__Contact_Already_Registered {
  UserNameUnavailable,
  ContactAlreadyRegistered,
}

export enum May__Not_Match__Or__Already_Confirmed {
  NoMatch,
  RegistrationAlreadyConfirmed,
}

export interface UserRegistrationRequest {
  userName: UserName
  email: Email
}

export interface HasRegistrationRequestFailReason {
  reason: May__UserName_Unavailable__Or__Contact_Already_Registered
}

export interface HasConfirmationRequestFailReason {
  reason: May__Not_Match__Or__Already_Confirmed
}

export interface HasRegistrationRequestId {
  registrationRequestId: RegistrationRequestId
}

export type RegistrationRecord = UserRegistrationRequest & HasRegistrationRequestId
export type RegistrationConfirmRecord = RegistrationRecord & { attempt: number }

export type ScheduleConfirmationTimeout = RegistrationConfirmRecord & { timeout: number, u?: 's' | 'm' | 'h' | 'd' }

