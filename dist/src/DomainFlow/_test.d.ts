import { DomainFlow } from '.';
declare type TestDomainFlow = DomainFlow<{
    a: number;
    b: string;
    c: boolean;
}, {
    a: ['b', 'c'];
    b: ['c', 'a'];
    c: ['a', 'b'];
}>;
export declare const tuc: TestDomainFlow;
export declare const domain: import("./ChannelsEE").Domain<{
    a: number;
    b: string;
    c: boolean;
}, {
    a: ["b", "c"];
    b: ["c", "a"];
    c: ["a", "b"];
}>;
export declare const send: () => void;
export {};
//# sourceMappingURL=_test.d.ts.map