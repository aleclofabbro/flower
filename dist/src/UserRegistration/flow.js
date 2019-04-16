"use strict";
// import { UserRegistrationInCharge, SendUserRegistrationConfirmation, DeleteUserRegistrationRequest, UserConfirmationWaitTimeout } from './msg';
// export namespace UserRegistration {
//   export const SendUserRegistrationConfirmationWhenUserRegistrationInCharge =
//     (_: UserRegistrationInCharge): [
//       SendUserRegistrationConfirmation
//     ] => [
//         {
//           userRegistrationRequestId: _.userRegistrationRequestId,
//           attempt: 1,
//           userContact: _.userContact,
//           userName: _.userName
//         }
//       ]
//   export const MaySendUserRegistrationConfirmationWhenUserConfirmationWaitTimeout =
//     (_: UserConfirmationWaitTimeout): [
//       SendUserRegistrationConfirmation | DeleteUserRegistrationRequest
//     ] => [
//         {
//           userRegistrationRequestId: _.userRegistrationRequestId,
//           attempt: 1,
//           userContact: _.userContact,
//           userName: _.userName
//         }
//       ]
// }
//# sourceMappingURL=flow.js.map