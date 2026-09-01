import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reemplazo } from "./reemplazo.entity";
import { Especialidad } from "../../especialidades/especialidads/entities/especialidad.entity";

@Entity('replacements_specialties')
export class ReemplazoEspecialidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Reemplazo, reemplazo => reemplazo.especialidadesAsignadas)
  @JoinColumn({ name: 'id_reemplazo' })
  reemplazo: Reemplazo;

  @ManyToOne(() => Especialidad, especialidad => especialidad.integrantesAsignados)
  @JoinColumn({ name: 'id_especialidad' })
  especialidad: Especialidad;

  @Column({ type: 'varchar', length: 20, default: 'primaria' })
  tipo: string; // primaria | secundaria
}