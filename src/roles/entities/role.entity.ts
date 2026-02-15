import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    user: User[];
}
