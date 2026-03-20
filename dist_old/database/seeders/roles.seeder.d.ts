import { Permission } from "src/admin/permissions/entities/permission.entity";
import { Role } from "src/admin/roles/entities/role.entity";
import { Repository } from "typeorm";
export declare class RolesSeeder {
    private readonly rolerepo;
    private readonly permissionRepo;
    constructor(rolerepo: Repository<Role>, permissionRepo: Repository<Permission>);
    run(): Promise<void>;
}
