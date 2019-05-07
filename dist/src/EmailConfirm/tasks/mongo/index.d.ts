import { Coll } from './Types';
import { BaseRecord } from '../../Types';
export interface Config {
    coll: Coll;
    base: BaseRecord;
}
declare const tasks: (_: Config) => {
    checkEmailConfirmation: import("../../../lib/Task").Task<Pick<import("../../Types").ProcessRecord, "email" | "id">, import("../../Tasks").CheckEmailConfirmationOutcome>;
    shouldConfirmationProcessStart: import("../../../lib/Task").Task<Pick<import("../../Types").ProcessRecord, "id">, import("../../Tasks").ShouldConfirmationProcessStartOutcome>;
    takeInCharge: import("../../../lib/Task").Task<Pick<import("../../Types").ProcessRecord, "email" | "userName">, import("../../Tasks").TakeInChargeOutcome>;
};
export default tasks;
//# sourceMappingURL=index.d.ts.map