"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// type Node<WF> = /* ScalarNode<WF> |  */VectorNode<WF>
var Ur = {
    RegistrationRequest: {
        RegistrationInCharge: {
            SendRegistrationConfirmation: {
                RegistrationConfirmationSent: {
                    ConfirmRegistrationRequest: {
                        RegistrationConfirmed: {
                            ActivateUser: null
                        },
                        ConfirmRegistrationRequestFail: null
                    },
                    ConfirmationWaitTimeout: {
                        DeleteRegistrationRequest: null,
                        SendRegistrationConfirmation: null
                    }
                },
                SendRegistrationConfirmationUnreachable: {
                    DeleteRegistrationRequest: null
                },
            }
        },
        RegistrationRequestFail: null,
    }
};
//# sourceMappingURL=_wf_.js.map