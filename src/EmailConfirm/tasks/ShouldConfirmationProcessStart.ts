import { ShouldConfirmationProcessStart } from '../Tasks';
import { Status } from '../Types';
import { Coll } from './Types';


export const shouldConfirmationProcessStart = (coll: Coll): ShouldConfirmationProcessStart => async (trigger) => {
  const resp = await coll.updateOne({
    ...trigger,
    status: Status.WIP,
    $expr: {
      $lt: [{ $size: "$attempts" }, '$maxAttempts']
    },
  }, {
      $push: { attempts: new Date() }
    })
  if (resp.modifiedCount === 1) {
    return {
      t: 'ShouldStart',
      p: trigger
    }
  } else {
    const record = await coll.findOne(trigger)
    if (!record) {
      return {
        t: 'NotFound',
        p: trigger
      }
    } else if (record.attempts.length >= record.maxAttempts) {
      return {
        t: 'ShouldNotStart',
        p: {
          ...trigger,
          reason: 'maxAttemptReached'
        }
      }
    } else {
      throw record
    }
  }
}

