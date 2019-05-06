export declare type Email = string;
export declare type UserName = string;
export declare type Id = string;
export interface ProcessRecord {
    id: Id;
    email: Email;
    userName: UserName;
    sartedAt: Date;
    attempts: Date[];
    maxAttempts: number;
    waitHours: number;
}
//# sourceMappingURL=Types.d.ts.map