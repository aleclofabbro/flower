
import { ProcessRecord } from './Types';
import { TaskNode } from '../DomainFlow/Proc';

export type Tasks = {
  takeInCharge: TaskNode<TakeInChargeTrigger, TakeInChargeOutcome>
  checkEmailConfirmation: TaskNode<CheckEmailConfirmationTrigger, CheckEmailConfirmationOutcome>
  confirmationProcessStart: TaskNode<ConfirmationProcessStartTrigger, ConfirmationProcessStartOutcome>
}
// declare const cc: Tasks['checkEmailConfirmation']
// cc({ email: '', id: '' }).then(_ => {
//   if (_.t === 'Failed') {
//     const {p:res} = _
//     res
//   } else {
//     const {p:res} = _
//     res
//   }
// })

export type TakeInChargeTrigger = Pick<ProcessRecord, | 'email' | 'userName'>
export type TakeInChargeOutcome = {
  InCharge: Pick<ProcessRecord, | 'id' | 'email' | 'userName'>
  Rejected: {
    reason: 'userAlreadyExists' | 'emailRegistered'
  }
}



export type CheckEmailConfirmationTrigger = Pick<ProcessRecord, 'email' | 'id'>
export type CheckEmailConfirmationOutcome = {
  UserConfirmed: Pick<ProcessRecord, 'id'>
  Failed: null
}


export type ConfirmationProcessStartTrigger = Pick<ProcessRecord, 'id'>
export type ConfirmationProcessStartOutcome = {
  Started: Pick<ProcessRecord, 'id'>
  NotStarted: Pick<ProcessRecord, 'id'> & {
    reason: 'maxAttemptReached'
  }
}