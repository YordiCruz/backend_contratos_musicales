import { Entity, Column, ManyToOne, PrimaryColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import { Contrato } from './contrato.entity';
import { Integrante } from '../../integrantes/entities/integrante.entity';

@Entity('contrato_integrante')
export class ContratoIntegrante {
  @PrimaryColumn('uuid')
  id_contrato: string;

  @PrimaryColumn('uuid')
  id_integrante: string;

  @ManyToOne(() => Contrato, contrato => contrato.integrantes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_contrato' })
  contrato: Contrato;

  @ManyToOne(() => Integrante, integrante => integrante.contratos)
  @JoinColumn({ name: 'id_integrante' })
  integrante: Integrante;

  @Column({ type: 'varchar', length: 50 })
  especialidad: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  compensacion_hora: number;

  @Column({ type: 'int' })
  horas_contratadas: number;

  @Column({ type: 'varchar', length: 20, default: 'pendiente' })
  estado: string; // pendiente | aceptado | rechazado


  @CreateDateColumn({type: 'timestamp'})
  creado_en: Date

}