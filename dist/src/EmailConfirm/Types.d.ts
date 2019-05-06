export declare type Email = string;
export declare type UserName = string;
export declare type Id = string;
export declare enum Status {
    REQ_ACCEPTED = 0,
    WIP = 1,
    USER_CONFIRMED = 2,
    TIMEOUT_CONFIRM = 3
}
export interface ProcessRecord {
    id: Id;
    email: Email;
    userName: UserName;
    sartedAt: Date;
    attempts: Date[];
    maxAttempts: number;
    waitHours: number;
    status: Status;
}
export declare type BaseRecord = Pick<ProcessRecord, 'maxAttempts' | 'waitHours'>;
//# sourceMappingURL=Types.d.ts.map