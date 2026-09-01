import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

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
