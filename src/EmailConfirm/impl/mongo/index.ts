import { checkEmailConfirmation } from './CheckEmailConfirmation'
import { shouldConfirmationProcessStart } from './ShouldConfirmationProcessStart'
import { takeInCharge } from './TakeInCharge'
import { Coll } from './Types';
import { BaseRecord, EmailConfirmTasks } from '../../Types';

export interface Config {
  coll: Coll,
  base: BaseRecord
}

export const tasks = (_: Config): EmailConfirmTasks => {
  return {
    checkEmailConfirmation: checkEmailConfirmation(_.coll),
    shouldConfirmationProcessStart: shouldConfirmationProcessStart(_.coll),
    takeInCharge: takeInCharge(_.coll, _.base),
  }
}