import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Permission } from "../../permissions/entities/permission.entity";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar', 
        length: 50, 
        nullable: false,
        unique: true })
    nombre: string

    @Column({ type: 'text'})
    descripcion: string

    @CreateDateColumn()
    creado_en: Date;

    @UpdateDateColumn()
    actualizado_en: Date;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];

    @ManyToMany(() => Permission, (permiso) => permiso.roles, {cascade: true})
    @JoinTable({
        name: 'roles_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id'
        }
    })
    permissions: Permission[]
}
