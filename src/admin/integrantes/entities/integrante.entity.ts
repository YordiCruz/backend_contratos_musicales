import { Especialidad } from "src/admin/especialidades/especialidads/entities/especialidad.entity";
import { Persona } from "src/admin/personas/entities/persona.entity";
import { User } from "src/admin/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('group_members')
export class Integrante {

    @PrimaryGeneratedColumn('uuid')
    id: string

   @OneToOne(() => Persona)
   @JoinColumn({ name: 'id_persona' })
   persona: Persona; 

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    tarifa_base_hora: number

    @Column({ type: 'varchar', length: 4, nullable: false })
    moneda: string

    @Column({ type: 'date', nullable: false })
    fecha_ingreso: Date

    @Column({type: 'varchar', length: 20, default: 'activo'})
    estado: string

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'registrado_por' })
    registrado_por: User;


    @CreateDateColumn({ type: 'timestamp' })
    creado_en: Date

    @UpdateDateColumn({  type: 'timestamp' })
    actualizado_en: Date

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    eliminado_en: Date

    @ManyToMany(()=> Especialidad, especialidad => especialidad.integrantes)
    @JoinTable({
        name: 'members_specialties',
        joinColumn: {
            name: 'id_integrante',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'id_especialidad',
            referencedColumnName: 'id'
        }
    })
    especialidades: Especialidad[]

}
