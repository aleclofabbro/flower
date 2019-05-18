import { checkEmailConfirmation } from './CheckEmailConfirmation'
import { shouldConfirmationProcessStart } from './ShouldConfirmationProcessStart'
import { takeInCharge } from './TakeInCharge'
import { Coll } from './Types';
import { BaseRecord } from '../../Types';
import { EmailConfirmTasks } from '../../Domain';

export interface Config {
  coll: Coll,
  base: BaseRecord
}

export const emailConfirmTasks = (_: Config): EmailConfirmTasks => {
  return {
    checkEmailConfirmation: checkEmailConfirmation(_.coll),
    shouldConfirmationProcessStart: shouldConfirmationProcessStart(_.coll),
    takeInCharge: takeInCharge(_.coll, _.base),
  }
}