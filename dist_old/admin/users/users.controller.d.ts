import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FiltrosUserDto } from './dto/filtros-user.dto';
import { CreateUserDataDto } from './dto/create-user-data.dto';
import { UpdatePasswordUsersDto } from './dto/update-password-users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(req: any, createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(filters: FiltrosUserDto): Promise<import("./dto/response-user.dto").ResponseUserDto[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./dto/response-user.dto").ResponseUserDto>;
    updatepassword(id: string, updateDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
    updatepasswordusers(id: string, updateDto: UpdatePasswordUsersDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createUserFromPersona(idPersona: string, dto: CreateUserDataDto): Promise<import("./entities/user.entity").User>;
    activar(id: string): Promise<{
        message: string;
        user: import("./entities/user.entity").User;
    }>;
}
