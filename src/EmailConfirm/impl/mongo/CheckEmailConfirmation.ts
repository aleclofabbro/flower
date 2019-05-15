import { CheckEmailConfirmation } from '../../Tasks';
import { Status } from '../../Types';
import { Coll } from './Types';
import { ObjectID } from 'bson';

export const checkEmailConfirmation = (coll: Coll): CheckEmailConfirmation => async trigger => {
  const _id = ObjectID.createFromHexString(trigger.id)

  const resp = await coll.updateOne({
    _id,
    email: trigger.email,
    status: Status.WIP
  }, {
      $set: {
        status: Status.USER_CONFIRMED,
        confirmedAt: new Date()
      }
    })

  if (resp.modifiedCount === 1) {
    return {
      t: 'UserConfirmed',
      p: {
        id: trigger.id
      }
    }
  } else {
    return {
      t: 'Failed',
      p: {
        id: trigger.id,
        reason: 'notFound'
      }
    }
  }
}
