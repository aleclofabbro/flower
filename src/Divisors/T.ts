export type Process<
  Start extends {},
  End extends {},
  Blocks extends {
    [t: string]: [any, { [t: string]: any }]
  },
  Conn extends <
    T extends keyof Blocks,
    //N extends keyof (Blocks[T][1])
    >(t: T/* , n: N */) => any extends
    (t: T/* , n: N */) => any ? T/* , N */ : never

  > = {
    Start: Start
    End: End
    Blocks: Blocks
    Conn: Conn
  }