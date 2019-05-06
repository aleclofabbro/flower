export interface Div {
    base: number;
    exp: number;
}
export interface Start {
    num: number;
}
export interface WithCurrent extends Start {
    curDiv: Div;
}
export interface WithDivs extends Start {
    divs: Div[];
}
export interface WithRest extends Start {
    rest: number;
}
export interface Working extends WithCurrent, WithDivs, WithRest {
}
export interface DoneWithRest extends WithDivs, WithRest {
}
export interface DoneWithoutRest extends WithDivs {
}
//# sourceMappingURL=DivisorsFlow.d.ts.map