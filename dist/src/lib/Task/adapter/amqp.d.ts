import { Channel } from 'amqplib';
import { Task, /* OutcomeOf, */ SomeOutcomeOf } from '../';
export interface Names {
    trigger: string;
    queue: string;
    outcome: string;
}
export declare const adapt: <Tsk extends Task<any, any>>(channel: Channel, name: string) => Promise<{
    names: Names;
    triggerTask: (t: Tsk extends Task<infer T, any> ? T : never) => Promise<string>;
    probe: <Ks extends keyof (Tsk extends Task<any, infer O> ? O : never)>(sink: (msg: SomeOutcomeOf<Tsk extends Task<any, infer O> ? O : never, Ks>[Ks]) => unknown, opts?: {
        types?: Ks[] | undefined;
        id?: string | undefined;
        probeName?: string | undefined;
    }) => Promise<() => Promise<import("amqplib/properties").Replies.Empty>>;
    consume: (task: Tsk) => Promise<() => Promise<import("amqplib/properties").Replies.Empty>>;
}>;
//# sourceMappingURL=amqp.d.ts.map