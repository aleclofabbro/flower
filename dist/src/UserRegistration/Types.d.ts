export declare type Email = string;
export declare type UserName = string;
export declare type RegistrationRequestId = string;
export declare enum May__UserName_Unavailable__Or__Contact_Already_Registered {
    UserNameUnavailable = "UserNameUnavailable",
    ContactAlreadyRegistered = "ContactAlreadyRegistered"
}
export declare enum May__Not_Match__Or__Already_Confirmed {
    NoMatch = 0,
    RegistrationAlreadyConfirmed = 1
}
export interface UserRegistrationRequest {
    userName: UserName;
    email: Email;
}
export interface HasRegistrationRequestFailReason {
    reason: May__UserName_Unavailable__Or__Contact_Already_Registered;
}
export interface HasConfirmationRequestFailReason {
    reason: May__Not_Match__Or__Already_Confirmed;
}
export interface HasRegistrationRequestId {
    registrationRequestId: RegistrationRequestId;
}
export declare type RegistrationRecord = UserRegistrationRequest & HasRegistrationRequestId;
export declare type RegistrationConfirmRecord = RegistrationRecord & {
    attempt: number;
};
export declare type ScheduleConfirmationTimeout = RegistrationConfirmRecord & {
    timeout: number;
    u?: 's' | 'm' | 'h' | 'd';
};
//# sourceMappingURL=Types.d.ts.map