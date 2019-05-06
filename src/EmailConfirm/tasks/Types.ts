import { Collection } from 'mongodb';
import { ProcessRecord } from '../Types';

export type Coll = Collection<Pick<ProcessRecord, Exclude<keyof ProcessRecord, 'id'>>>