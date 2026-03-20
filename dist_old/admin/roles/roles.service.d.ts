import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { User } from 'src/admin/users/entities/user.entity';
import { AssignRolesDto } from './dto/assign-role.dto';
export declare class RolesService {
    private readonly rolerepo;
    private readonly userrepo;
    constructor(rolerepo: Repository<Role>, userrepo: Repository<User>);
    create(createRoleDto: CreateRoleDto): string;
    findAll(): Promise<Role[]>;
    assignRoles(userId: string, dto: AssignRolesDto): Promise<{
        message: string;
    }>;
    findOne(id: number): string;
    update(id: number, updateRoleDto: UpdateRoleDto): string;
    removeRole(userId: string, roleId: string): Promise<{
        message: string;
    }>;
}
