import { ProcessRecord } from './Types';
import { TaskNode } from '../DomainFlow/Proc';
export declare type TakeInChargeTrigger = Pick<ProcessRecord, 'email' | 'userName'>;
export declare type TakeInChargeOutcome = {
    InCharge: Pick<ProcessRecord, 'id' | 'email' | 'userName'>;
    Rejected: {
        reason: 'userAlreadyExists' | 'emailRegistered';
    };
};
export declare type TakeInCharge = TaskNode<TakeInChargeTrigger, TakeInChargeOutcome>;
export declare type CheckEmailConfirmationTrigger = Pick<ProcessRecord, 'email' | 'id'>;
export declare type CheckEmailConfirmationOutcome = {
    UserConfirmed: Pick<ProcessRecord, 'id'>;
    Failed: {
        reason: 'notFound';
    };
};
export declare type CheckEmailConfirmation = TaskNode<CheckEmailConfirmationTrigger, CheckEmailConfirmationOutcome>;
export declare type ShouldConfirmationProcessStartTrigger = Pick<ProcessRecord, 'id'>;
export declare type ShouldConfirmationProcessStartOutcome = {
    ShouldStart: Pick<ProcessRecord, 'id'>;
    NotFound: Pick<ProcessRecord, 'id'>;
    ShouldNotStart: Pick<ProcessRecord, 'id'> & {
        reason: 'maxAttemptReached';
    };
};
export declare type ShouldConfirmationProcessStart = TaskNode<ShouldConfirmationProcessStartTrigger, ShouldConfirmationProcessStartOutcome>;
//# sourceMappingURL=Tasks.d.ts.map