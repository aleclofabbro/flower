import { CheckEmailConfirmation } from '../Tasks';
import { Status } from '../Types';
import { Coll } from './Types';

export const checkEmailConfirmation = (coll: Coll): CheckEmailConfirmation => async (trigger) => {
  const resp = await coll.updateOne({
    ...trigger,
    status: Status.WIP
  }, {
      $set: {
        status: Status.USER_CONFIRMED
      }
    })

  if (resp.modifiedCount === 1) {
    return {
      t: 'UserConfirmed',
      p: trigger
    }
  } else {
    return {
      t: 'Failed',
      p: {
        reason: 'notFound'
      }
    }
  }
}
