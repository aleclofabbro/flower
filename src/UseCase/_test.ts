import { UseCase } from '.';
import { createDomain } from './ChannelsEE';

type TestUseCase = UseCase<{
  a: number
  b: string
  c: boolean
}, {
  a: ['b', 'c']
  b: ['c', 'a']
  c: ['a', 'b']
}>
const tuc: TestUseCase = {
  a: (signal, followup) => {
    console.log('\n---\n', 'a', signal, '\n---\n')
    setTimeout(() => followup('b', `${signal} is ${signal % 2 ? 'odd' : 'even'}`), 1100)
  },
  b: (signal, followup) => {
    console.log('\n---\n', 'b', signal, '\n---\n')
    setTimeout(() => followup('c', signal.indexOf('odd') === -1), 1200)
    setTimeout(() => followup('a', parseInt(signal) + 1), 1200)
  },
  c: (signal, followup) => {
    console.log('\n---\n', 'c', signal, '\n---\n')
    setTimeout(() => followup('a', signal ? 1 : 0), 1400)
  },
}

export const domain = createDomain(tuc, { shortCircuit: ['a', 'b'] })
domain.probeInAll(console.log.bind(null, '\n\nprobeInAll'))
domain.probeOutAll(console.log.bind(null, '\n\nprobeOutAll'))
domain.signalIn('a', 1)
setTimeout(() => domain.signalIn('a', 1001), 1000)