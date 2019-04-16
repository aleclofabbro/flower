import { UserRegistrationFailReason, UserName, Email, UserRegistrationRequestId, UserContact, UserConfirmRegistrationRequestFailReason } from './types';
export interface RegistrationRequest {
    userName: UserName;
    userContact: UserContact;
}
export interface UserRegistrationFail {
    userName: UserName;
    email: Email;
    reason: UserRegistrationFailReason;
}
export interface UserRegistrationInCharge {
    userName: UserName;
    userContact: UserContact;
    userRegistrationRequestId: UserRegistrationRequestId;
}
export interface SendUserRegistrationConfirmation {
    userName: UserName;
    userContact: UserContact;
    userRegistrationRequestId: UserRegistrationRequestId;
    attempt: number;
}
export interface UserConfirmRegistrationRequest {
    userRegistrationRequestId: UserRegistrationRequestId;
}
export interface UserConfirmRegistrationRequestFail {
    userRegistrationRequestId: UserRegistrationRequestId;
    reason: UserConfirmRegistrationRequestFailReason;
}
export interface UserRegistrationConfirmed {
    userRegistrationRequestId: UserRegistrationRequestId;
}
export interface UserConfirmationWaitTimeout {
    userName: UserName;
    userContact: UserContact;
    userRegistrationRequestId: UserRegistrationRequestId;
    attempt: number;
}
export interface DeleteUserRegistrationRequest {
    userRegistrationRequestId: UserRegistrationRequestId;
}
//# sourceMappingURL=msg.1.d.ts.map