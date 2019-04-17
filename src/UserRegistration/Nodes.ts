import UserRegistration from './UseCase';
import { Srv } from '../UseCase/OtherTypes';
import { UserRegistrationRequest, RegistrationRecord, May__UserName_Unavailable__Or__Contact_Already_Registered } from './Types';

export const createUseCase = (_: {
  registerRequest: Srv<[UserRegistrationRequest], RegistrationRecord | May__UserName_Unavailable__Or__Contact_Already_Registered>
}) => {
  const useCase: UserRegistration = {
    AttemptSendRegistrationConfirmation: (_/* , followUp */) => {
      console.log('AttemptSendRegistrationConfirmation', _)
    },
    ConfirmRegistrationRequest: (_/* , followUp */) => {
      console.log('ConfirmRegistrationRequest', _)
    },
    ConfirmationWaitTimeout: (_/* , followUp */) => {
      console.log('ConfirmationWaitTimeout', _)
    },
    DeleteRegistrationRequest: (_/* , followUp */) => {
      console.log('DeleteRegistrationRequest', _)
    },
    RegistrationConfirmFail: (_/* , followUp */) => {
      console.log('RegistrationConfirmFail', _)
    },
    RegistrationConfirmationSent: (_/* , followUp */) => {
      console.log('RegistrationConfirmationSent', _)
    },
    RegistrationConfirmed: (_/* , followUp */) => {
      console.log('RegistrationConfirmed', _)
    },
    RegistrationEmailIsUnreachable: (_/* , followUp */) => {
      console.log('RegistrationEmailIsUnreachable', _)
    },
    RegistrationInCharge: (_/* , followUp */) => {
      console.log('RegistrationInCharge', _)
    },
    RegistrationRequest: async (request, followUp) => {
      const resp = await _.registerRequest(request)
      if ('string' === typeof resp) {
        followUp('RegistrationRequestFail', { ...request, reason: resp })
      } else {
        followUp('RegistrationInCharge', resp)
      }
      console.log('RegistrationRequest', _)
    },
    RegistrationRequestFail: (_/* , followUp */) => {
      console.log('RegistrationRequestFail', _)
    },
    ScheduleConfirmationTimeout: (_/* , followUp */) => {
      console.log('ScheduleConfirmationTimeout', _)
    }
  }
  return useCase
}
