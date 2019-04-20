import { DomainFlow } from '.';
import { createDomain } from './ChannelsEE';

type TestDomainFlow = DomainFlow<{
  a: number
  b: string
  c: boolean
}, {
  a: ['b', 'c']
  b: ['c', 'a']
  c: ['a', 'b']
}>
export const tuc: TestDomainFlow = {
  a: (message, followup) => {
    console.log('\n---\n', 'a', message, '\n---\n')
    setTimeout(() => followup('b', `${message} is ${message % 2 ? 'odd' : 'even'}`), 1100)
  },
  b: (message, followup) => {
    console.log('\n---\n', 'b', message, '\n---\n')
    setTimeout(() => followup('c', message.indexOf('odd') === -1), 1200)
  },
  c: (message, followup) => {
    console.log('\n---\n', 'c', message, '\n---\n')
    setTimeout(() => followup('a', message ? 1 : 0), 1400)
  },
}

export const domain = createDomain(tuc, {
  shortCircuit: false
  // shortCircuit: true
  // shortCircuit: ['a', 'b']
})

export const send = () => {

  domain.input.all((_, _meta) => {
    if (_.msgName === 'a') {
      _.msg
    } else if (_.msgName === 'b') {
      _.msg
    } else if (_.msgName === 'c') {
      _.msg
    }
  })
  domain.input.on('a', (_msg, _mta) => { })

  domain.input.all(console.log.bind(null, '\n\neeIn'))
  domain.output.all(console.log.bind(null, '\n\neeOut'))
  domain.input.emit(
    'a',
    1)
  // setTimeout(() => domain.output.emit('b', '1001'), 1000)
  // setTimeout(() => domain.output.emit('c', true), 1000)
}
