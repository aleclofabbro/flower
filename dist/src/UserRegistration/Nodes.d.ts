import { Srv } from '../DomainFlow/OtherTypes';
import { UserRegistrationRequest, RegistrationRequestFailReason, RegistrationConfirmRecord, HasRegistrationRequestId, RegistrationRecord, ConfirmationRequestFailReason } from './Types';
export declare const createDomainNodes: (_: {
    maxSendAttempts: Srv<[RegistrationConfirmRecord], number>;
    registerRequest: Srv<[UserRegistrationRequest], string | RegistrationRequestFailReason>;
    deleteRequest: Srv<[HasRegistrationRequestId], unknown>;
    confirmRegistration: Srv<[RegistrationRecord], true | ConfirmationRequestFailReason>;
    sendRegistrationConfirmation: Srv<[RegistrationConfirmRecord], unknown>;
    scheduleConfirmationTimeout: Srv<[RegistrationConfirmRecord], unknown>;
}) => import("../DomainFlow/DomainFlow").DomainFlow<import("./DomainFlow").Messages, import("./DomainFlow").Flow>;
//# sourceMappingURL=Nodes.d.ts.map