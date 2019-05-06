import { Collection } from 'mongodb';
import { ProcessRecord } from '../Types';
export declare type Coll = Collection<Pick<ProcessRecord, Exclude<keyof ProcessRecord, 'id'>>>;
//# sourceMappingURL=Types.d.ts.map