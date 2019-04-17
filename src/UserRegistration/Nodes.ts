import UserRegistration from './UseCase';
import { Srv } from '../UseCase/OtherTypes';
import { UserRegistrationRequest, May__UserName_Unavailable__Or__Contact_Already_Registered, RegistrationRequestId } from './Types';

export const createUseCase = (_: {
  registerRequest: Srv<[UserRegistrationRequest], RegistrationRequestId | May__UserName_Unavailable__Or__Contact_Already_Registered>
}) => {
  const useCase: UserRegistration = {
    AttemptSendRegistrationConfirmation: (__/* , followUp */) => {
      console.log('AttemptSendRegistrationConfirmation', __)
    },
    ConfirmRegistrationRequest: (__/* , followUp */) => {
      console.log('ConfirmRegistrationRequest', __)
    },
    ConfirmationWaitTimeout: (__/* , followUp */) => {
      console.log('ConfirmationWaitTimeout', __)
    },
    DeleteRegistrationRequest: (__/* , followUp */) => {
      console.log('DeleteRegistrationRequest', __)
    },
    RegistrationConfirmFail: (__/* , followUp */) => {
      console.log('RegistrationConfirmFail', __)
    },
    RegistrationConfirmationSent: (__/* , followUp */) => {
      console.log('RegistrationConfirmationSent', __)
    },
    RegistrationConfirmed: (__/* , followUp */) => {
      console.log('RegistrationConfirmed', __)
    },
    RegistrationEmailIsUnreachable: (__/* , followUp */) => {
      console.log('RegistrationEmailIsUnreachable', __)
    },
    RegistrationInCharge: (__/* , followUp */) => {
      console.log('RegistrationInCharge', __)
    },
    RegistrationRequest: async (request, followUp) => {
      console.log('RegistrationRequest', request)
      const response = await _.registerRequest(request)
      if ('number' === typeof response) {
        return Array.of(['RegistrationRequestFail', { ...request, reason: response }])
      } else {
        followUp('RegistrationInCharge', { ...request, registrationRequestId: response })
      }
    },
    RegistrationRequestFail: (__/* , followUp */) => {
      console.log('RegistrationRequestFail', __)
    },
    ScheduleConfirmationTimeout: (__/* , followUp */) => {
      console.log('ScheduleConfirmationTimeout', __)
    }
  }
  return useCase
}
