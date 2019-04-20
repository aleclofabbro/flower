import {
  UserRegistrationRequest,
  HasRegistrationRequestFailReason,
  RegistrationRecord,
  RegistrationConfirmRecord,
  HasConfirmationRequestFailReason,
  HasRegistrationRequestId,
} from './Types';
import { DomainFlow } from '../DomainFlow';
// import StrictEventEmitter from 'strict-event-emitter-types/types/src';
// import { EventEmitter } from 'events';

export interface Messages {
  RegistrationRequest: UserRegistrationRequest
  RegistrationRequestFail: UserRegistrationRequest & HasRegistrationRequestFailReason
  RegistrationInCharge: RegistrationRecord

  AttemptSendRegistrationConfirmation: RegistrationConfirmRecord
  RegistrationConfirmationSent: RegistrationConfirmRecord
  RegistrationEmailIsUnreachable: RegistrationConfirmRecord
  ScheduleConfirmationTimeout: RegistrationConfirmRecord

  ConfirmationWaitTimeout: RegistrationConfirmRecord

  ConfirmRegistrationRequest: RegistrationRecord
  RegistrationConfirmFail: RegistrationRecord & HasConfirmationRequestFailReason
  RegistrationConfirmed: RegistrationRecord

  DeleteRegistrationRequest: HasRegistrationRequestId
}

export interface Flow {
  RegistrationRequest: ['RegistrationRequestFail', 'RegistrationInCharge']

  RegistrationInCharge: ['AttemptSendRegistrationConfirmation']
  RegistrationConfirmationSent: ['ScheduleConfirmationTimeout']
  RegistrationEmailIsUnreachable: ['DeleteRegistrationRequest']
  ConfirmationWaitTimeout: ['AttemptSendRegistrationConfirmation', 'DeleteRegistrationRequest']

  ConfirmRegistrationRequest: ['RegistrationConfirmFail', 'RegistrationConfirmed']

  AttemptSendRegistrationConfirmation: []
  DeleteRegistrationRequest: []
  ScheduleConfirmationTimeout: []

  RegistrationConfirmFail: []
  RegistrationConfirmed: []
  RegistrationRequestFail: []
}
// declare const ee:StrictEventEmitter<EventEmitter, Messages>

// ee.emit('ConfirmationWaitTimeout',{email:'',performedAttempts:1,registrationRequestId:'',userName:''})
// ee.on('ConfirmationWaitTimeout',_=>{})
export type UserRegistrationDomainFlow = DomainFlow<Messages, Flow>

export default UserRegistrationDomainFlow
