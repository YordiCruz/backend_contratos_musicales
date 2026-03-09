import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CategoriasEspecialidad } from "../../categorias_especialidads/entities/categorias_especialidad.entity";
import { Integrante } from "src/admin/integrantes/entities/integrante.entity";
import { Reemplazo } from "src/admin/reemplazos/entities/reemplazo.entity";
import { IntegranteEspecialidad } from "src/admin/integrantes/entities/integrante-especialidad.entity";
import { ReemplazoEspecialidad } from "src/admin/reemplazos/entities/reemplazo-especialidad.entity";

@Entity('specialties')
export class Especialidad {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(()=> CategoriasEspecialidad, categoria => categoria.especialidades)
    @JoinColumn({name: 'id_categoria'})
    categoria: CategoriasEspecialidad

    @Column({type: 'varchar', length: 100, nullable: false, unique: true})
    nombre: string

    @Column({type: 'text', nullable: true})
    descripcion?: string

   @Column({ type: 'varchar', length: 20, default: 'activo' })
   estado: string

    @CreateDateColumn({type: 'timestamp'})
    creado_en: Date

    @UpdateDateColumn({type: 'timestamp'})
    actualizado_en: Date

    @DeleteDateColumn({type: 'timestamp', nullable: true})
    eliminado_en: Date


    @OneToMany(() => IntegranteEspecialidad, ie => ie.especialidad)
    integrantesAsignados: IntegranteEspecialidad[];
    
    
    @OneToMany(() => ReemplazoEspecialidad, re => re.especialidad)
    reemplazosAsignados: ReemplazoEspecialidad[];
    

}


