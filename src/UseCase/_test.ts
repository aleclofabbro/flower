import { UseCase } from '.';
import { createDomain } from './ChannelsEE';

type TestUseCase = UseCase<{
  a: number
  b: string
  c: boolean
}, {
  a: ['b', 'c']
  b: ['c']
  c: ['a', 'b']
}>
const tuc: TestUseCase = {
  a: (signal, followup) => {
    console.log('\n---\n', 'a', signal, '\n---\n')
    followup('b', signal.toFixed(10))
  },
  b: (signal, followup) => {
    console.log('\n---\n', 'b', signal, '\n---\n')
    followup('c', signal.length === 0)
  },
  c: (signal, followup) => {
    console.log('\n---\n', 'c', signal, '\n---\n')
    followup('a', signal ? 1 : 0)
  },
}

export const domain = createDomain(tuc, { shortCircuit: ['a', 'b'] })
domain.probeInAll(console.log.bind(null, '\n\nprobeInAll'))
domain.probeOutAll(console.log.bind(null, '\n\nprobeOutAll'))
domain.signalIn('a', 1)