
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
export type CheckEmailConfirmationTrigger = Pick<ProcessRecord, 'id' | 'email'>
export type CheckEmailConfirmationOutcome = {
  UserConfirmed: Pick<ProcessRecord, 'id'>
  Failed: Pick<ProcessRecord, 'id'> & {
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

// export type W1 = Wire<TakeInCharge, 'InCharge', ShouldConfirmationProcessStart>
// export type W2 = Wire<CheckEmailConfirmation, 'UserConfirmed', ShouldConfirmationProcessStart>







