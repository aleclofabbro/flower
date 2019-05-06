import { checkEmailConfirmation } from './CheckEmailConfirmation'
import { shouldConfirmationProcessStart } from './ShouldConfirmationProcessStart'
import { takeInCharge } from './TakeInCharge'
import { Coll } from './Types';
import { BaseRecord } from '../../Types';

export interface Config {
  coll: Coll,
  base: BaseRecord
}
const tasks = (_: Config) => {
  return {
    checkEmailConfirmation: checkEmailConfirmation(_.coll),
    shouldConfirmationProcessStart: shouldConfirmationProcessStart(_.coll),
    takeInCharge: takeInCharge(_.coll, _.base),
  }
}
export default tasks