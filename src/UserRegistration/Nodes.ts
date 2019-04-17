import UserRegistration from './UseCase';
import { Srv } from '../UseCase/OtherTypes';
import { UserRegistrationRequest, May__UserName_Unavailable__Or__Contact_Already_Registered, RegistrationRequestId } from './Types';

export const createUseCase = (_: {
  registerRequest: Srv<[UserRegistrationRequest], RegistrationRequestId | May__UserName_Unavailable__Or__Contact_Already_Registered>
}) => {
  const useCase: UserRegistration = {
    AttemptSendRegistrationConfirmation: (__/* , fw */) => {
      console.log('AttemptSendRegistrationConfirmation', __)
    },
    ConfirmRegistrationRequest: (__/* , fw */) => {
      console.log('ConfirmRegistrationRequest', __)
    },
    ConfirmationWaitTimeout: (__/* , fw */) => {
      console.log('ConfirmationWaitTimeout', __)
    },
    DeleteRegistrationRequest: (__/* , fw */) => {
      console.log('DeleteRegistrationRequest', __)
    },
    RegistrationConfirmFail: (__/* , fw */) => {
      console.log('RegistrationConfirmFail', __)
    },
    RegistrationConfirmationSent: (__/* , fw */) => {
      console.log('RegistrationConfirmationSent', __)
    },
    RegistrationConfirmed: (__/* , fw */) => {
      console.log('RegistrationConfirmed', __)
    },
    RegistrationEmailIsUnreachable: (__/* , fw */) => {
      console.log('RegistrationEmailIsUnreachable', __)
    },
    RegistrationInCharge: (__/* , fw */) => {
      console.log('RegistrationInCharge', __)
    },
    RegistrationRequest: async (request, fw) => {
      console.log('RegistrationRequest', request)
      const response = await _.registerRequest(request)
      if ('number' === typeof response) {
        fw('RegistrationRequestFail', { ...request, reason: response })
      } else {
        fw('RegistrationInCharge', { ...request, registrationRequestId: response })
      }
    },
    RegistrationRequestFail: (__/* , fw */) => {
      console.log('RegistrationRequestFail', __)
    },
    ScheduleConfirmationTimeout: (__/* , fw */) => {
      console.log('ScheduleConfirmationTimeout', __)
    }
  }
  return useCase
}
