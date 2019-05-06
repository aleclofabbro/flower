// import { Process } from './T';

export interface Div {
  base: number
  exp: number
}
export interface Start { num: number }
export interface WithCurrent extends Start { curDiv: Div }
export interface WithDivs extends Start { divs: Div[] }
export interface WithRest extends Start { rest: number }
export interface Working extends WithCurrent, WithDivs, WithRest { }
export interface DoneWithRest extends WithDivs, WithRest { }
export interface DoneWithoutRest extends WithDivs { }

// export type Z = Process<
//   Start,
//   {
//     withRest: DoneWithRest
//     withoutRest: DoneWithoutRest
//   },
//   {
//     divideByNext: [
//       Start | Working,
//       {
//         nodiv: Working
//         div: Working
//         doneWithRest: DoneWithRest
//         doneWithoutRest: DoneWithoutRest
//       }]
//   },
//  X extends (_:'divideByNext')=>'divideByNext'

// >



