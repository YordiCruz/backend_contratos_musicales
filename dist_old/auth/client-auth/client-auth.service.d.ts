import { User } from 'src/admin/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ClientLoginDto } from './dto/client-login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class ClientAuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
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
