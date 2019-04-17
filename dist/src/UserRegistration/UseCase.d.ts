import { UserRegistrationRequest, HasRegistrationRequestFailReason, RegistrationRecord, RegistrationConfirmRecord, HasConfirmationRequestFailReason, HasRegistrationRequestId } from './Types';
import { UseCase } from '../UseCase';
export interface Signals {
    RegistrationRequest: UserRegistrationRequest;
    RegistrationRequestFail: UserRegistrationRequest & HasRegistrationRequestFailReason;
    RegistrationInCharge: RegistrationRecord;
    AttemptSendRegistrationConfirmation: RegistrationConfirmRecord;
    RegistrationConfirmationSent: RegistrationConfirmRecord;
    RegistrationEmailIsUnreachable: RegistrationConfirmRecord;
    ScheduleConfirmationTimeout: RegistrationConfirmRecord;
    ConfirmationWaitTimeout: RegistrationConfirmRecord;
    ConfirmRegistrationRequest: RegistrationRecord;
    RegistrationConfirmFail: RegistrationRecord & HasConfirmationRequestFailReason;
    RegistrationConfirmed: RegistrationRecord;
    DeleteRegistrationRequest: HasRegistrationRequestId;
}
export interface Flow {
    RegistrationRequest: ['RegistrationRequestFail', 'RegistrationInCharge'];
    RegistrationInCharge: ['AttemptSendRegistrationConfirmation'];
    RegistrationConfirmationSent: ['ScheduleConfirmationTimeout'];
    RegistrationEmailIsUnreachable: ['DeleteRegistrationRequest'];
    ConfirmationWaitTimeout: ['AttemptSendRegistrationConfirmation', 'DeleteRegistrationRequest'];
    ConfirmRegistrationRequest: ['RegistrationConfirmFail', 'RegistrationConfirmed'];
    AttemptSendRegistrationConfirmation: [];
    DeleteRegistrationRequest: [];
    RegistrationConfirmFail: [];
    RegistrationConfirmed: [];
    RegistrationRequestFail: [];
    ScheduleConfirmationTimeout: [];
}
export declare type UserRegistrationUseCase = UseCase<Signals, Flow>;
export default UserRegistrationUseCase;
//# sourceMappingURL=UseCase.d.ts.map