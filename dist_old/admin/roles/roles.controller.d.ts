import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignRolesDto } from './dto/assign-role.dto';
import { RemoveRoleDto } from './dto/remove-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): string;
    findOne(id: string): string;
    update(id: string, updateRoleDto: UpdateRoleDto): string;
    findAll(): Promise<import("./entities/role.entity").Role[]>;
    removeRole(userId: string, dto: RemoveRoleDto): Promise<{
        message: string;
    }>;
    assignRoles(userId: string, dto: AssignRolesDto): Promise<{
        message: string;
    }>;
}
