import { channelsFor } from '.';

const x = channelsFor<{
  n: number,
  s: string,

}>();

console.log(x('n', 0))
const n = x('n', (_, __) => { console.log('n', _, __) })
const s = x('s', (_) => { console.log('s', _) })
console.log(x('n', 1))
console.log(x('s', 'one'))
n()
console.log(x('n', 2))
console.log(x('s', 'two'))
s()
console.log(x('n', 3))
console.log(x('s', 'three'))
