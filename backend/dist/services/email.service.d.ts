interface SendCodeOptions {
    to: string;
    code: string;
    userName?: string | null;
}
export declare function sendVerificationEmail({ to, code, userName, }: SendCodeOptions): Promise<void>;
interface SendDeleteWarningOptions {
    to: string;
    userName?: string | null;
    expiresAt: Date;
}
interface SendReactivateCodeOptions {
    to: string;
    userName?: string | null;
    code: string;
}
export declare function sendDeleteWarningEmail({ to, userName, expiresAt, }: SendDeleteWarningOptions): Promise<void>;
export declare function sendReactivateCodeEmail({ to, userName, code, }: SendReactivateCodeOptions): Promise<void>;
export {};
//# sourceMappingURL=email.service.d.ts.map