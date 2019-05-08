import { checkEmailConfirmation } from './CheckEmailConfirmation'
import { shouldConfirmationProcessStart } from './ShouldConfirmationProcessStart'
import { takeInCharge } from './TakeInCharge'
import { Coll } from './Types';
import { BaseRecord, EmailConfirmDomain } from '../../Types';

export interface Config {
  coll: Coll,
  base: BaseRecord
}

export const tasks = (_: Config): EmailConfirmDomain => {
  return {
    checkEmailConfirmation: checkEmailConfirmation(_.coll),
    shouldConfirmationProcessStart: shouldConfirmationProcessStart(_.coll),
    takeInCharge: takeInCharge(_.coll, _.base),
  }
}