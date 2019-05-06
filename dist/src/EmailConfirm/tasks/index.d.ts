import { Coll } from './Types';
import { BaseRecord } from '../Types';
export interface Config {
    coll: Coll;
    base: BaseRecord;
}
export declare const tasks: (_: Config) => {
    checkEmailConfirmation: import("../../DomainFlow/Proc").Task<Pick<import("../Types").ProcessRecord, "id" | "email">, import("../Tasks").CheckEmailConfirmationOutcome>;
    shouldConfirmationProcessStart: import("../../DomainFlow/Proc").Task<Pick<import("../Types").ProcessRecord, "id">, import("../Tasks").ShouldConfirmationProcessStartOutcome>;
    takeInCharge: import("../../DomainFlow/Proc").Task<Pick<import("../Types").ProcessRecord, "email" | "userName">, import("../Tasks").TakeInChargeOutcome>;
};
//# sourceMappingURL=index.d.ts.map