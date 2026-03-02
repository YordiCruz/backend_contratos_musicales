import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Integrante } from "./integrante.entity";
import { Especialidad } from "src/admin/especialidades/especialidads/entities/especialidad.entity";

@Entity('members_specialties')
export class IntegranteEspecialidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Integrante, integrante => integrante.especialidadesAsignadas)
  @JoinColumn({ name: 'id' })
  integrante: Integrante;

  @ManyToOne(() => Especialidad, especialidad => especialidad.integrantesAsignados)
  @JoinColumn({ name: 'id' })
  especialidad: Especialidad;

  @Column({ type: 'varchar', length: 20, default: 'primaria' })
  tipo: string; // primaria | secundaria
}