export declare type Email = string;
export declare type UserName = string;
export declare type RegistrationRequestId = string;
export declare enum RegistrationRequestFailReason {
    UserNameUnavailable = 0,
    ContactAlreadyRegistered = 1
}
export declare enum ConfirmationRequestFailReason {
    NoMatch = 0,
    RegistrationAlreadyConfirmed = 1
}
export interface UserRegistrationRequest {
    userName: UserName;
    email: Email;
}
export interface HasRegistrationRequestFailReason {
    reason: RegistrationRequestFailReason;
}
export interface HasConfirmationRequestFailReason {
    reason: ConfirmationRequestFailReason;
}
export interface HasRegistrationRequestId {
    registrationRequestId: RegistrationRequestId;
}
export declare type RegistrationRecord = UserRegistrationRequest & HasRegistrationRequestId;
export declare type RegistrationConfirmRecord = RegistrationRecord & {
    performedAttempts: number;
};
export declare type ScheduleConfirmationTimeout = RegistrationConfirmRecord & {
    timeout: number;
    u?: 's' | 'm' | 'h' | 'd';
};
//# sourceMappingURL=Types.d.ts.map