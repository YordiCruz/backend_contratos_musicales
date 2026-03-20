export declare class EmailService {
    private client;
    constructor();
    send(to: string, subject: string, html: string): Promise<import("mailtrap").SendResponse>;
}
