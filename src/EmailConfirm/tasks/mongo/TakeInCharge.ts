import { TakeInCharge } from '../../Tasks';
import { Status, BaseRecord } from '../../Types';
import { Coll } from './Types';
import { MongoError } from 'mongodb';


export const takeInCharge = (coll: Coll, base: BaseRecord): TakeInCharge => async (trigger) => {
  try {
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
          id: resp.insertedId.toHexString()
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
  } catch (_) {
    const e: MongoError = _
    if (
      e.code === 11000 &&
      'string' === typeof e.errmsg &&
      (
        e.errmsg.includes('email dup key') ||
        e.errmsg.includes('userName dup key')
      )
    ) {
      return {
        t: 'Rejected',
        p: {
          reason: e.errmsg.includes('userName dup key')
            ? 'userAlreadyExists'
            : 'emailRegistered'
        }
      }
    } else {
      throw e
    }
  }
}
