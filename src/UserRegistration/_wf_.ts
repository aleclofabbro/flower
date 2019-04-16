import { UserRegistration } from './msg';

// interface PathFn<O> {
//   // (): []
//   <A extends keyof O>(): [A]
//   <A extends keyof O, B extends keyof O[A]>(): [A, B]
//   // < A extends keyof O, B extends keyof O[A], C extends keyof O[A][B]> = [A,B,C]
//   // < A extends keyof O, B extends keyof O[A], C extends keyof O[A][B], D extends keyof O[A][B][C]> = [A,B,C,D]
//   // < A extends keyof O, B extends keyof O[A], C extends keyof O[A][B], D extends keyof O[A][B][C], E extends keyof O[A][B][C][D]> = [A,B,C,D,E]
// }
// type Path<O> = ReturnType<PathFn<O>>
// type ScalarNode<WF> = keyof WF
type VectorNode<WF> = Partial<{
  [t in keyof WF]:
  // | ScalarNode<WF>
  // | Path<Node<WF>>
  | VectorNode<WF>
  | null
  // | false
  //| (ScalarNode<WF> | VectorNode<WF>)[]
}>
// type Node<WF> = /* ScalarNode<WF> |  */VectorNode<WF>

const Ur: VectorNode<UserRegistration> = {
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
}
