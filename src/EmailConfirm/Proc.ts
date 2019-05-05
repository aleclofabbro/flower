import { StartNode, TaskNode, Proc } from '../DomainFlow/Proc';
import { Starter } from './Types';
import { TakeInChargeOutcomes, CheckResendOutcomes, CheckConfirmationOutcomes } from './Services';

export type Process = Proc<
  StartNode<Starter>,
  {
    takeInCharge: TaskNode<TakeInChargeOutcomes>
    checkResend: TaskNode<CheckResendOutcomes>
    checkConfirmation: TaskNode<CheckConfirmationOutcomes>
  }
>