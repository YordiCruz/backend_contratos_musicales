import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FiltrosUserDto } from './dto/filtros-user.dto';
import { Persona } from '../personas/entities/persona.entity';
import { CreateUserDataDto } from './dto/create-user-data.dto';
import { UpdatePasswordUsersDto } from './dto/update-password-users.dto';
export declare class UsersService {
    private readonly userrepo;
    private readonly personarepo;
    private readonly dataSource;
    constructor(userrepo: Repository<User>, personarepo: Repository<Persona>, dataSource: DataSource);
    create(createUserDto: CreateUserDto, user: any): Promise<User>;
    findAll(filters: FiltrosUserDto): Promise<ResponseUserDto[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<ResponseUserDto>;
    updatePassword(id: string, dto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
    updatePasswordUsers(id: string, dto: UpdatePasswordUsersDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createUserFromExistingPersona(idPersona: string, dto: CreateUserDataDto): Promise<User>;
    activar(id: string): Promise<{
        message: string;
        user: User;
    }>;
}
