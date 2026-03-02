import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Especialidad } from "src/admin/especialidades/especialidads/entities/especialidad.entity";
import { Reemplazo } from "./reemplazo.entity";

@Entity('replacements_specialties')
export class ReemplazoEspecialidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Reemplazo, reemplazo => reemplazo.especialidadesAsignadas)
  @JoinColumn({ name: 'id' })
  reemplazo: Reemplazo;

  @ManyToOne(() => Especialidad, especialidad => especialidad.integrantesAsignados)
  @JoinColumn({ name: 'id' })
  especialidad: Especialidad;

  @Column({ type: 'varchar', length: 20, default: 'primaria' })
  tipo: string; // primaria | secundaria
}