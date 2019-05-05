import { Process } from './T';

interface Div {
  base: number
  exp: number
}
interface Start { num: number }
interface WithCurrent extends Start { curDiv: Div }
interface WithDivs extends Start { divs: Div[] }
interface WithRest extends Start { rest: number }
interface Working extends WithCurrent, WithDivs, WithRest { }
interface DoneWithRest extends WithDivs, WithRest { }
interface DoneWithoutRest extends WithDivs { }

export type Z = Process<
  Start,
  {
    withRest: DoneWithRest
    withoutRest: DoneWithoutRest
  },
  {
    divideByNext: [
      Start | Working,
      {
        nodiv: Working
        div: Working
        doneWithRest: DoneWithRest
        doneWithoutRest: DoneWithoutRest
      }]
  },
  'divideByNext'

>



