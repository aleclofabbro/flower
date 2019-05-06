import { Tasks } from './Tasks';

export const create = (): Tasks => {
  return {
    async checkEmailConfirmation(trigger) {
      return { t: 'Failed', p: null }
    },
    async confirmationProcessStart(trigger) {
      return {
        started: true,
        ...trigger
      }
    },
    async takeInCharge(trigger) {
      // return {
      //   id:'',
      //   inCharge:true,
      //   ...trigger
      // }
      trigger
      return {
        inCharge: false,
        reason: 'userAlreadyExists'
      }
    }
  }
} 