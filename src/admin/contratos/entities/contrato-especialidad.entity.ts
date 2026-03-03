import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contrato } from "./contrato.entity";
import { Especialidad } from "src/admin/especialidades/especialidads/entities/especialidad.entity";

@Entity('contrato_especialidades')
export class ContratoEspecialidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Contrato, contrato => contrato.especialidades, { onDelete: 'CASCADE' })
  contrato: Contrato;

  @ManyToOne(() => Especialidad, { eager: true })
  @JoinColumn({ name: 'id_especialidad' })
  especialidad: Especialidad;

  @Column({ type: 'varchar', length: 20, nullable: true })
  tipo_asignacion: 'primario' | 'secundario' | null; // cómo se cubrió

  @Column({ type: 'boolean', default: true })
  requerido: boolean;
}