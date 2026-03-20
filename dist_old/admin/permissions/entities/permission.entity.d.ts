import { Role } from "src/admin/roles/entities/role.entity";
export declare class Permission {
    id: string;
    nombre: string;
    descripcion: string;
    roles: Role[];
}
