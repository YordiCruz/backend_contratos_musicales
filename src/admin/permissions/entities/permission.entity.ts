import { Role } from "src/admin/roles/entities/role.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('permissions')
export class Permission {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    nombre: string

    @Column({ type: 'text' })
    descripcion: string

    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[]


}
