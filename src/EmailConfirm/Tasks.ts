
import { ProcessRecord } from './Types';
import { TaskNode } from '../DomainFlow/Proc';

export type TakeInChargeTrigger = Pick<ProcessRecord, | 'email' | 'userName'>
export type TakeInChargeOutcome = {
  InCharge: Pick<ProcessRecord, | 'id' | 'email' | 'userName'>
  Rejected: {
    reason: 'userAlreadyExists' | 'emailRegistered'
  }
}
export type TakeInCharge = TaskNode<TakeInChargeTrigger, TakeInChargeOutcome>


export type CheckEmailConfirmationTrigger = Pick<ProcessRecord, 'email' | 'id'>
export type CheckEmailConfirmationOutcome = {
  UserConfirmed: Pick<ProcessRecord, 'id'>
  Failed: {
    reason: 'notFound'
  }
}
export type CheckEmailConfirmation = TaskNode<CheckEmailConfirmationTrigger, CheckEmailConfirmationOutcome>


export type ShouldConfirmationProcessStartTrigger = Pick<ProcessRecord, 'id'>
export type ShouldConfirmationProcessStartOutcome = {
  ShouldStart: Pick<ProcessRecord, 'id'>
  NotFound: Pick<ProcessRecord, 'id'>
  ShouldNotStart: Pick<ProcessRecord, 'id'> & {
    reason: 'maxAttemptReached'
  }
}
export type ShouldConfirmationProcessStart = TaskNode<ShouldConfirmationProcessStartTrigger, ShouldConfirmationProcessStartOutcome>








