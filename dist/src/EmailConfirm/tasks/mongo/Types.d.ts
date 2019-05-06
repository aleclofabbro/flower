import { Collection } from 'mongodb';
import { ProcessRecord } from '../../Types';
export declare type CollSchema = Pick<ProcessRecord, Exclude<keyof ProcessRecord, 'id'>>;
export declare type Coll = Collection<CollSchema>;
//# sourceMappingURL=Types.d.ts.map