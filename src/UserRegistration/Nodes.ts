import UserRegistration from './UseCase';
import { Srv } from '../UseCase/OtherTypes';
import { UserRegistrationRequest, RegistrationRequestFailReason, RegistrationRequestId, RegistrationConfirmRecord, HasRegistrationRequestId, RegistrationRecord, ConfirmationRequestFailReason } from './Types';

export const createUseCase = (_: {
  maxSendAttempts: Srv<[RegistrationConfirmRecord], number>,
  registerRequest: Srv<[UserRegistrationRequest], RegistrationRequestId | RegistrationRequestFailReason>
  deleteRequest: Srv<[HasRegistrationRequestId], unknown>
  confirmRegistration: Srv<[RegistrationRecord], ConfirmationRequestFailReason | true>
  sendRegistrationConfirmation: Srv<[RegistrationConfirmRecord], unknown>
  scheduleConfirmationTimeout: Srv<[RegistrationConfirmRecord], unknown>
}) => {
  const useCase: UserRegistration = {
    AttemptSendRegistrationConfirmation: async (regConfRecord/* , fw */) => {
      const incRegConfRecord: RegistrationConfirmRecord = {
        ...regConfRecord,
        performedAttempts: regConfRecord.performedAttempts + 1
      }
      await _.sendRegistrationConfirmation(incRegConfRecord)
    },
    ConfirmRegistrationRequest: async (regRecord, fw) => {
      const resp = await _.confirmRegistration(regRecord)
      if (resp === true) {
        fw('RegistrationConfirmed', regRecord)
      } else {
        fw('RegistrationConfirmFail', { ...regRecord, reason: resp })
      }
    },
    ConfirmationWaitTimeout: async (regConfRecord, fw) => {
      if (regConfRecord.performedAttempts === await _.maxSendAttempts(regConfRecord)) {
        fw('DeleteRegistrationRequest', { registrationRequestId: regConfRecord.registrationRequestId })
      } else {
        fw('AttemptSendRegistrationConfirmation', regConfRecord)
      }
    },
    DeleteRegistrationRequest: async (hasRegReqId/* , fw */) => {
      await _.deleteRequest(hasRegReqId)
    },
    RegistrationConfirmFail: (/* failedRecord , fw */) => {
    },
    RegistrationConfirmationSent: (registrationConfirmRecord, fw) => {
      fw('ScheduleConfirmationTimeout', registrationConfirmRecord)
    },
    RegistrationConfirmed: (/* registrationRecord, fw */) => {
    },
    RegistrationEmailIsUnreachable: (registrationConfirmRecord, fw) => {
      fw('DeleteRegistrationRequest', registrationConfirmRecord)
    },
    RegistrationInCharge: (registrationRecord, fw) => {
      fw('AttemptSendRegistrationConfirmation', { ...registrationRecord, performedAttempts: 0 })
    },
    RegistrationRequest: async (request, fw) => {
      const response = await _.registerRequest(request)
      if ('number' === typeof response) {
        fw('RegistrationRequestFail', { ...request, reason: response })
      } else {
        fw('RegistrationInCharge', { ...request, registrationRequestId: response })
      }
    },
    RegistrationRequestFail: (__/* , fw */) => {
    },
    ScheduleConfirmationTimeout: async (regConfRec/*  , fw */) => {
      await _.scheduleConfirmationTimeout(regConfRec)
    }
  }
  return useCase
}
