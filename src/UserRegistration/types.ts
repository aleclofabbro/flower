export type Email = string
export type UserName = string
export type RegistrationRequestId = string

export enum May__UserName_Unavailable__Or__Contact_Already_Registered {
  UserNameUnavailable,
  ContactAlreadyRegistered
}

export enum May__Not_Match__Or__Already_Confirmed {
  NoMatch,
  RegistrationAlreadyConfirmed
}
