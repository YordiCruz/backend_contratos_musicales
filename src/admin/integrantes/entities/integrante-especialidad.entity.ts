import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Integrante } from "./integrante.entity";
import { Especialidad } from "../../especialidades/especialidads/entities/especialidad.entity";

@Entity('members_specialties')
export class IntegranteEspecialidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Integrante, integrante => integrante.especialidadesAsignadas)
  @JoinColumn({ name: 'id_integrante' })
  integrante: Integrante;

  @ManyToOne(() => Especialidad, especialidad => especialidad.integrantesAsignados)
  @JoinColumn({ name: 'id_especialidad' })
  especialidad: Especialidad;

  @Column({ type: 'varchar', length: 20, default: 'primario' })
  tipo: string; // primaria | secundaria
}