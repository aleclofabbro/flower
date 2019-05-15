import { ShouldConfirmationProcessStart } from '../../Tasks';
import { Status } from '../../Types';
import { Coll } from './Types';
import { ObjectID } from 'bson';


export const shouldConfirmationProcessStart = (coll: Coll): ShouldConfirmationProcessStart => async (trigger) => {
  const _id = ObjectID.createFromHexString(trigger.id)

  const resp = await coll.updateOne({
    _id,
    status: { $in: [Status.WIP, Status.REQ_ACCEPTED] },
    $expr: {
      $lt: [{ $size: "$attempts" }, '$maxAttempts']
    },
  }, {
      $push: { attempts: new Date() },
      $set: {
        status: Status.WIP
      }
    })
  if (resp.modifiedCount === 1) {
    return {
      t: 'ShouldStart',
      p: trigger
    }
  } else {
    const record = await coll.findOne({ _id }, { projection: { status: true, attempts: true, maxAttempts: true } })
    if (!record || record.status !== Status.WIP) {
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
      throw [record, resp]
    }
  }
}

