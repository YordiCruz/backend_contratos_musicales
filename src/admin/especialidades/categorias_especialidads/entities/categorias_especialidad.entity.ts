import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Especialidad } from "../../especialidads/entities/especialidad.entity";

@Entity('specialty_categories')
export class CategoriasEspecialidad {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombre: string

    @Column({ type: 'varchar', length: 50, nullable: true })
    icono?:string

    @Column({ type: 'varchar', length: 20, default: 'activo' })
    estado: string

    @CreateDateColumn({ type: 'timestamp' })
    creado_en: Date

    @UpdateDateColumn({ type: 'timestamp' })
    actualizado_en: Date

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    eliminado_en: Date

    @OneToMany(()=> Especialidad, especialidad => especialidad.categoria)
    especialidades: Especialidad[]


}
