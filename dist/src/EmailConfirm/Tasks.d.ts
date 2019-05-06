import { ProcessRecord } from './Types';
import { TaskNode } from '../DomainFlow/Proc';
export declare type TakeInCharge = TaskNode<TakeInChargeTrigger, TakeInChargeOutcome>;
export declare type CheckEmailConfirmation = TaskNode<CheckEmailConfirmationTrigger, CheckEmailConfirmationOutcome>;
export declare type ConfirmationProcessStart = TaskNode<ConfirmationProcessStartTrigger, ConfirmationProcessStartOutcome>;
export declare type TakeInChargeTrigger = Pick<ProcessRecord, 'email' | 'userName'>;
export declare type TakeInChargeOutcome = {
    InCharge: Pick<ProcessRecord, 'id' | 'email' | 'userName'>;
    Rejected: {
        reason: 'userAlreadyExists' | 'emailRegistered';
    };
};
export declare type CheckEmailConfirmationTrigger = Pick<ProcessRecord, 'email' | 'id'>;
export declare type CheckEmailConfirmationOutcome = {
    UserConfirmed: Pick<ProcessRecord, 'id'>;
    Failed: null;
};
export declare type ConfirmationProcessStartTrigger = Pick<ProcessRecord, 'id'>;
export declare type ConfirmationProcessStartOutcome = {
    Started: Pick<ProcessRecord, 'id'>;
    NotStarted: Pick<ProcessRecord, 'id'> & {
        reason: 'maxAttemptReached';
    };
};
//# sourceMappingURL=Tasks.d.ts.map