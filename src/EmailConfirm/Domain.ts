import { CheckEmailConfirmation, ShouldConfirmationProcessStart, TakeInCharge } from './Tasks';
import { DomainWire } from '../lib/Domain';

export type EmailConfirmTasks = {
  checkEmailConfirmation: CheckEmailConfirmation
  shouldConfirmationProcessStart: ShouldConfirmationProcessStart
  takeInCharge: TakeInCharge
}

export const wire1: DomainWire<
  EmailConfirmTasks,
  'takeInCharge',
  'InCharge',
  'shouldConfirmationProcessStart'
> = ['takeInCharge', 'InCharge', 'shouldConfirmationProcessStart']

export const wire2: DomainWire<
  EmailConfirmTasks,
  'shouldConfirmationProcessStart',
  'ShouldStart',
  'shouldConfirmationProcessStart'
> = ['shouldConfirmationProcessStart', 'ShouldStart', 'shouldConfirmationProcessStart']

// export const W4: DomainWire<
//   { a: Task<{ a: number }, { a: { a: number } }> },
//   'a',
//   'a',
//   'a'
// > = ['a', 'a', 'a']
