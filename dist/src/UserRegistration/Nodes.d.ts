import { Srv } from '../UseCase/OtherTypes';
import { UserRegistrationRequest, RegistrationRecord, May__UserName_Unavailable__Or__Contact_Already_Registered } from './Types';
export declare const createUseCase: (_: {
    registerRequest: Srv<[UserRegistrationRequest], RegistrationRecord | May__UserName_Unavailable__Or__Contact_Already_Registered>;
}) => import("../UseCase/UseCase").UseCase<import("./UseCase").Signals, import("./UseCase").Flow>;
//# sourceMappingURL=Nodes.d.ts.map