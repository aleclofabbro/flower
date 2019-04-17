"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RegistrationRequestFailReason;
(function (RegistrationRequestFailReason) {
    RegistrationRequestFailReason[RegistrationRequestFailReason["UserNameUnavailable"] = 0] = "UserNameUnavailable";
    RegistrationRequestFailReason[RegistrationRequestFailReason["ContactAlreadyRegistered"] = 1] = "ContactAlreadyRegistered";
})(RegistrationRequestFailReason = exports.RegistrationRequestFailReason || (exports.RegistrationRequestFailReason = {}));
var ConfirmationRequestFailReason;
(function (ConfirmationRequestFailReason) {
    ConfirmationRequestFailReason[ConfirmationRequestFailReason["NoMatch"] = 0] = "NoMatch";
    ConfirmationRequestFailReason[ConfirmationRequestFailReason["RegistrationAlreadyConfirmed"] = 1] = "RegistrationAlreadyConfirmed";
})(ConfirmationRequestFailReason = exports.ConfirmationRequestFailReason || (exports.ConfirmationRequestFailReason = {}));
//# sourceMappingURL=Types.js.map