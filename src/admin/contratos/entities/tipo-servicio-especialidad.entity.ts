import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Especialidad } from "../../especialidades/especialidads/entities/especialidad.entity";

@Entity('servicio_especialidades')
export class TipoServicioEspecialidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  tipo_servicio: string; // mariachi, orquesta, etc.

  @ManyToOne(() => Especialidad, { eager: true })
  @JoinColumn({ name: 'id_especialidad' })
  especialidad: Especialidad;

  @Column({ type: 'boolean', default: true })
  requerido: boolean; // si es obligatorio
}