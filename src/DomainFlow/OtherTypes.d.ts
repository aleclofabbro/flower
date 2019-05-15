export type Srv<Req extends any[], Res> = (...args: Req) => Res | Promise<Res>
