import { Services } from './Services';
import { Process } from './Proc';

export const create = (_: Services): Process => {

  const start: Process['start'] = async (head, req) => {
    const resp = await _.TakeInCharge({ head, ...req })
    return resp
  }

  const tasks: Process['tasks'] = {
    async checkConfirmation(_head) {
      return {
        t: 'Confirmed',
        p: null
      }
    },
    async checkResend(_head) {
      return {
        t: 'ReachedMaxAttempts',
        p: null
      }
    },

    async takeInCharge(_head) {
      return {
        t: 'InCharge',
        p: null
      }
    },
  }

  return {
    start,
    tasks
  }
} 