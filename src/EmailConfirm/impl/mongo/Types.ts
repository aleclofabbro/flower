import { Collection } from 'mongodb';
import { ProcessRecord } from '../../Types';

export type CollSchema = Pick<ProcessRecord, Exclude<keyof ProcessRecord, 'id'>>
export type Coll = Collection<CollSchema>