export declare type Y<Start extends {}, End extends {}, Blocks extends {
    [t: string]: [any, {
        [t: string]: any;
    }];
}, Conn extends <T extends keyof Blocks>(t: T) => any extends (t: T) => any ? T : never> = {
    Start: Start;
    End: End;
    Blocks: Blocks;
    Conn: Conn;
};
//# sourceMappingURL=T.d.ts.map