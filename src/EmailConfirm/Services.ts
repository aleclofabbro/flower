
import { State, Starter } from './Types';
import { ProcId, Srv, BaseHeaders } from '../DomainFlow/Proc';

export interface Services {
  TakeInCharge: Srv<TakeInChargeReq, TakeInChargeOutcomes>
  SendEmail: Srv<SendEmaiReq, SendEmailOutcomes>
  SetTimeout: Srv<TimeoutReq, SetTimeoutOutcomes>
  GetState: Srv<ProcId, GetStateOutcomes>
  CheckConfirmation: Srv<CheckConfirmReq, CheckConfirmationOutcomes>
}


// declare const x: Services
// x.CheckConfirmation({ email: '', procId: '' }).then(_ => {
//   const z = _()
//   if (_.t === 'InCharge') {
//     _.p
//   } else {
//     _.p
//   }
// })


export type TakeInChargeReq = Starter & { head: BaseHeaders }

export type SendEmaiReq = Pick<State,
  | 'email'
  | 'procId'
  | 'attempts'>

export type TimeoutReq = Pick<State,
  | 'procId'
  | 'waitHours'>

export type CheckConfirmReq = Pick<State,
  | 'email'
  | 'procId'
>


export interface TakeInChargeOutcomes {
  InCharge: null
  NotInCharge: 'userNameExists' | 'inProcess'
}

export interface CheckResendOutcomes {
  Resending: null
  ReachedMaxAttempts: null
}
export interface CheckConfirmationOutcomes {
  Confirmed: null,
  ConfirmFailed: null
}

export interface SendEmailOutcomes {
  Sent: null
}
export interface SetTimeoutOutcomes {
  TimeoutSet: null
}
export interface GetStateOutcomes {
  Got: State
  NotFound: null
}
