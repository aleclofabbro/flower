import { TakeInCharge } from '../Tasks';
import { Status, BaseRecord } from '../Types';
import { Coll } from './Types';


export const takeInCharge = (coll: Coll, base: BaseRecord): TakeInCharge => async (trigger) => {
  const resp = await coll.insertOne({
    ...trigger,
    ...base,
    attempts: [],
    sartedAt: new Date(),
    status: Status.REQ_ACCEPTED,
  })
  if (resp.insertedCount === 1) {
    return {
      t: 'InCharge',
      p: {
        id: resp.insertedId.toHexString(),
        ...trigger
      }
    }
  } else {
    const existingRecord = await coll.findOne({ $or: [{ email: trigger.email }, { userName: trigger.userName }] })
    if (existingRecord) {
      if (existingRecord.email === trigger.email) {
        return {
          t: 'Rejected',
          p: {
            reason: 'emailRegistered'
          }
        }

      } else if (existingRecord.userName === trigger.userName) {
        return {
          t: 'Rejected',
          p: {
            reason: 'userAlreadyExists'
          }
        }
      } else {
        throw `unknown error - trigger:${JSON.stringify(trigger)} existingRecord:${JSON.stringify(existingRecord)}`
      }
    } else {
      throw `no existingRecord - unknown reason - trigger:${JSON.stringify(trigger)}`
    }
  }
}