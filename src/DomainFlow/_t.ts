import { TaskNode, TaskNodeGen } from './Proc';

type T =
  | { a: 'A' | 'B', d: number }
  | { a: 'A' | 'B', c: string, d: number }

type O =
  | { b: 'K' | 'J' }


declare const tng: TaskNodeGen<T, O>
declare const tn: TaskNode<T, O>

tng()
tng(['b'])
tng(['b'], ['d'])
tn({ a: 'A', c: '', d: 2 }).then(p => {

})