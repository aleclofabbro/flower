import { Domain } from '../ChannelsEE';
import { Channel } from 'amqplib';
import { Flow } from '../DomainFlow';
export declare const adapt: <Msgs, Flw extends Flow<Msgs>>(domain: Domain<Msgs, Flw>, channel: Channel) => Promise<string[]>;
//# sourceMappingURL=amqp.d.ts.map