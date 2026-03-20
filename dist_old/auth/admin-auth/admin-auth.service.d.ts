import { User } from 'src/admin/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AdminLoginDto } from './dto/admin-login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AdminAuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
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
    refresh(token: string): Promise<{
        access_token: string;
    }>;
    getProfile(userId: string): Promise<{
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
}
