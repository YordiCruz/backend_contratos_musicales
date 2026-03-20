import { Permission } from "src/admin/permissions/entities/permission.entity";
import { Role } from "src/admin/roles/entities/role.entity";
import { Repository } from "typeorm";
export declare class PermissionsSeeder {
    private readonly permisorepo;
    private readonly rolRepo;
    constructor(permisorepo: Repository<Permission>, rolRepo: Repository<Role>);
    run(): Promise<void>;
}
