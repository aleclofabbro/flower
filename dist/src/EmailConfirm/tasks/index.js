"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CheckEmailConfirmation_1 = require("./CheckEmailConfirmation");
var ShouldConfirmationProcessStart_1 = require("./ShouldConfirmationProcessStart");
var TakeInCharge_1 = require("./TakeInCharge");
exports.tasks = function (_) {
    return {
        checkEmailConfirmation: CheckEmailConfirmation_1.checkEmailConfirmation(_.coll),
        shouldConfirmationProcessStart: ShouldConfirmationProcessStart_1.shouldConfirmationProcessStart(_.coll),
        takeInCharge: TakeInCharge_1.takeInCharge(_.coll, _.base),
    };
};
//# sourceMappingURL=index.js.map