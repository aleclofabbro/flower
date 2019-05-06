import { Collection } from 'mongodb';
import { ProcessRecord } from '../Types';
export declare type Coll = Collection<Pick<ProcessRecord, Exclude<keyof ProcessRecord, 'id'>>>;
export declare const checkEmailConfirmation: (coll: Collection<Pick<ProcessRecord, "email" | "userName" | "sartedAt" | "attempts" | "maxAttempts" | "waitHours" | "status">>) => import("../../DomainFlow/Proc").TaskNode<Pick<ProcessRecord, "id" | "email">, import("../Tasks").CheckEmailConfirmationOutcome>;
export declare const shouldConfirmationProcessStart: (coll: Collection<Pick<ProcessRecord, "email" | "userName" | "sartedAt" | "attempts" | "maxAttempts" | "waitHours" | "status">>) => import("../../DomainFlow/Proc").TaskNode<Pick<ProcessRecord, "id">, import("../Tasks").ShouldConfirmationProcessStartOutcome>;
export declare const takeInCharge: (coll: Collection<Pick<ProcessRecord, "email" | "userName" | "sartedAt" | "attempts" | "maxAttempts" | "waitHours" | "status">>, base: Pick<ProcessRecord, "maxAttempts" | "waitHours">) => import("../../DomainFlow/Proc").TaskNode<Pick<ProcessRecord, "email" | "userName">, import("../Tasks").TakeInChargeOutcome>;
//# sourceMappingURL=index.3.d.ts.map