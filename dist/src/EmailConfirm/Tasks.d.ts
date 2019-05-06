import { ProcessRecord } from './Types';
import { Task } from '../DomainFlow/Proc';
/**
 * TakeInCharge
 */
export declare type TakeInCharge = Task<TakeInChargeTrigger, TakeInChargeOutcome>;
export declare type TakeInChargeTrigger = Pick<ProcessRecord, 'email' | 'userName'>;
export declare type TakeInChargeOutcome = {
    InCharge: Pick<ProcessRecord, 'id' | 'email' | 'userName'>;
    Rejected: {
        reason: 'userAlreadyExists' | 'emailRegistered';
    };
};
/**
 * CheckEmailConfirmationTrigger
 */
export declare type CheckEmailConfirmationTrigger = Pick<ProcessRecord, 'email' | 'id'>;
export declare type CheckEmailConfirmationOutcome = {
    UserConfirmed: Pick<ProcessRecord, 'id'>;
    Failed: {
        reason: 'notFound';
    };
};
export declare type CheckEmailConfirmation = Task<CheckEmailConfirmationTrigger, CheckEmailConfirmationOutcome>;
/**
 * ShouldConfirmationProcessStartTrigger
 */
export declare type ShouldConfirmationProcessStartTrigger = Pick<ProcessRecord, 'id'>;
export declare type ShouldConfirmationProcessStartOutcome = {
    ShouldStart: Pick<ProcessRecord, 'id'>;
    NotFound: Pick<ProcessRecord, 'id'>;
    ShouldNotStart: Pick<ProcessRecord, 'id'> & {
        reason: 'maxAttemptReached';
    };
};
export declare type ShouldConfirmationProcessStart = Task<ShouldConfirmationProcessStartTrigger, ShouldConfirmationProcessStartOutcome>;
//# sourceMappingURL=Tasks.d.ts.map