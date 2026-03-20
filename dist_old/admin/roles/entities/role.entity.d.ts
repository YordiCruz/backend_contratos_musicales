import { Permission } from "src/admin/permissions/entities/permission.entity";
import { User } from "src/admin/users/entities/user.entity";
export declare class Role {
    id: string;
    nombre: string;
    descripcion: string;
    creado_en: Date;
    actualizado_en: Date;
    users: User[];
    permissions: Permission[];
}
