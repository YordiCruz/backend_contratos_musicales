import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
export declare class AdminAuthController {
    private readonly adminAuthService;
    constructor(adminAuthService: AdminAuthService);
    login(dto: AdminLoginDto): Promise<{
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
