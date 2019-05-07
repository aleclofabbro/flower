
import { ProcessRecord } from './Types';
import { Task } from '../lib/Task';

/**
 * TakeInCharge
 */
export type TakeInCharge = Task<TakeInChargeTrigger, TakeInChargeOutcome>
export type TakeInChargeTrigger = Pick<ProcessRecord, | 'email' | 'userName'>
export type TakeInChargeOutcome = {
  InCharge: Pick<ProcessRecord, | 'id'>
  Rejected: {
    reason: 'userAlreadyExists' | 'emailRegistered'
  }
}

/**
 * CheckEmailConfirmationTrigger
 */
export type CheckEmailConfirmationTrigger = Pick<ProcessRecord, 'email' | 'id'>
export type CheckEmailConfirmationOutcome = {
  UserConfirmed: Pick<ProcessRecord, 'id'>
  Failed: {
    reason: 'notFound'
  }
}
export type CheckEmailConfirmation = Task<CheckEmailConfirmationTrigger, CheckEmailConfirmationOutcome>


/**
 * ShouldConfirmationProcessStartTrigger
 */
export type ShouldConfirmationProcessStartTrigger = Pick<ProcessRecord, 'id'>
export type ShouldConfirmationProcessStartOutcome = {
  ShouldStart: Pick<ProcessRecord, 'id'>
  NotFound: Pick<ProcessRecord, 'id'>
  ShouldNotStart: Pick<ProcessRecord, 'id'> & {
    reason: 'maxAttemptReached'
  }
}
export type ShouldConfirmationProcessStart = Task<ShouldConfirmationProcessStartTrigger, ShouldConfirmationProcessStartOutcome>








