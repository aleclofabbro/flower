import {
  May__Not_Match__Or__Already_Confirmed,
  May__UserName_Unavailable__Or__Contact_Already_Registered,
  Email,
  UserName,
  RegistrationRequestId,
} from './types';


export interface UserRegistration {

  RegistrationRequest: {
    userName: UserName
    email: Email
  }

  RegistrationRequestFail: {
    userName: UserName
    email: Email
    reason: May__UserName_Unavailable__Or__Contact_Already_Registered
  }

  RegistrationInCharge: {
    userName: UserName
    email: Email
    registrationRequestId: RegistrationRequestId
  }

  SendRegistrationConfirmation: {
    userName: UserName
    email: Email
    registrationRequestId: RegistrationRequestId
    attempt: number
  }

  RegistrationConfirmationSent: {
    userName: UserName
    email: Email
    registrationRequestId: RegistrationRequestId
    attempt: number
  }

  SendRegistrationConfirmationUnreachable: {
    userName: UserName
    email: Email
    registrationRequestId: RegistrationRequestId
    attempt: number
  }

  ConfirmRegistrationRequest: {
    registrationRequestId: RegistrationRequestId
  }

  ConfirmRegistrationRequestFail: {
    reason: May__Not_Match__Or__Already_Confirmed
    registrationRequestId: RegistrationRequestId
  }

  RegistrationConfirmed: {
    registrationRequestId: RegistrationRequestId
  }

  ActivateUser: {
    registrationRequestId: RegistrationRequestId
  }

  ConfirmationWaitTimeout: {
    userName: UserName
    email: Email
    registrationRequestId: RegistrationRequestId,
    attempt: number
  }

  DeleteRegistrationRequest: {
    registrationRequestId: RegistrationRequestId
  }

}
