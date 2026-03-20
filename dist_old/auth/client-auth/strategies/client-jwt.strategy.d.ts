declare const ClientJwtStrategy_base: new (...args: any) => any;
export declare class ClientJwtStrategy extends ClientJwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        id: any;
        username: any;
        roles: any;
    }>;
}
export {};
