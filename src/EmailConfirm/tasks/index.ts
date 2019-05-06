import { TakeInCharge, ConfirmationProcessStart, CheckEmailConfirmation } from '../Tasks';

export const checkEmailConfirmation: CheckEmailConfirmation = async (trigger) => {
  trigger
  return { t: 'Failed', p: null }
}
export const confirmationProcessStart: ConfirmationProcessStart = async (trigger) => {
  return {
    t: 'Started',
    p: trigger
  }
}
export const takeInCharge: TakeInCharge = async (trigger) => {
  trigger
  return {
    t: 'InCharge',
    p: {
      id: '',
      ...trigger
    }
  }
  // return {
  //   t:'Rejected',
  //   p:{
  //     reason: 'userAlreadyExists'
  //   }
  // }
}
