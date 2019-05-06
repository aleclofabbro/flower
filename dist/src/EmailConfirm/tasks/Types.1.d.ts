import { Collection } from 'mongodb';
import { ProcessRecord } from '../Types';
export declare type Coll = Collection<Pick<ProcessRecord, Exclude<keyof ProcessRecord, 'id'>>>;
export * from './CheckEmailConfirmation';
export * from './ShouldConfirmationProcessStart';
export * from './TakeInCharge';
//# sourceMappingURL=Types.1.d.ts.map