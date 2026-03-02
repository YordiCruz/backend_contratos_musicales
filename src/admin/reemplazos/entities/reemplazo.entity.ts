import { ContratoReemplazo } from "src/admin/contratos/entities/contrato-reemplazo.entity";
import { Especialidad } from "src/admin/especialidades/especialidads/entities/especialidad.entity";
import { Persona } from "src/admin/personas/entities/persona.entity";
import { User } from "src/admin/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ReemplazoEspecialidad } from "./reemplazo-especialidad.entity";

@Entity('group_replacements')
export class Reemplazo {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @OneToOne(() => Persona, persona => persona.id)
    @JoinColumn({ name: 'id_persona' })
    persona: Persona

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    tarifa_base_hora: number

    @Column({ type: 'varchar', length: 4, nullable: false, enum: ['USD', 'BOB'] })
    moneda: string

    @Column({ type: 'varchar', nullable: false, default: 'activo' })
    estado: string

    @Column({ type: 'boolean', nullable: false, default: true })
    disponible: boolean

    @OneToMany(() => ContratoReemplazo, contratoReemplazo => contratoReemplazo.reemplazo)
    contratos: ContratoReemplazo[]

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'registrado_por' })
    registrado_por: User

    @CreateDateColumn({ type: 'timestamp' })
    creado_en: Date

    @UpdateDateColumn({ type: 'timestamp' })
    actualizado_en: Date

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    eliminado_en: Date

   
    @OneToMany(() => ReemplazoEspecialidad, re => re.reemplazo)
    especialidadesAsignadas: ReemplazoEspecialidad[];

}
