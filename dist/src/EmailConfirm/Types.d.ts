export declare type Email = string;
export declare type UserName = string;
export declare type Id = string;
export declare enum Status {
    REQ_ACCEPTED = "REQ_ACCEPTED",
    WIP = "WIP",
    USER_CONFIRMED = "USER_CONFIRMED",
    TIMEOUT_CONFIRM = "TIMEOUT_CONFIRM"
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