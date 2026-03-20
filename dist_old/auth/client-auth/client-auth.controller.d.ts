import { ClientAuthService } from './client-auth.service';
import { ClientLoginDto } from './dto/client-login.dto';
export declare class ClientAuthController {
    private readonly clientAuthService;
    constructor(clientAuthService: ClientAuthService);
    login(dto: ClientLoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            role: string;
            persona: {
                nombre: string;
                apellido: string;
                ci: string;
                telefono: string;
                email: string;
            };
        };
    }>;
    getProfile(req: any): Promise<{
        user: {
            id: string;
            email: string;
            role: string;
            persona: {
                nombre: string;
                apellido: string;
                ci: string;
                telefono: string;
                email: string;
            };
        };
    }>;
    refresh(token: string): Promise<{
        access_token: string;
    }>;
}
