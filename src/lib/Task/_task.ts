import { Task, _REMOVE_ME_MAYBE_TaskNodeGen } from './';

type Trig =
  | { a: 'A' | 'B', d: number, k: number }
  | { a: 'A' | 'B', d: number, c: string }

type Out =
  { b: 'K' | 'J', c: 1 | 2 }

type Tsk = Task<Trig, Out>
declare const tng: _REMOVE_ME_MAYBE_TaskNodeGen<Tsk>
declare const tn: Tsk

tng()
tng(['b'])
tng(['b'], ['d'])
tn({ a: 'A', k: 5, d: 2 }).then(_p => {

})