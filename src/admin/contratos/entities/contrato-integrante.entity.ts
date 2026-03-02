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

  @ManyToOne(() => Integrante, integrante => integrante.contratos, { eager: true })
  @JoinColumn({ name: 'id' })
  integrante: Integrante;

  @Column({ type: 'varchar', length: 50 })
  rol: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  compensacion_hora: number;

  @Column({ type: 'int' })
  horas_contratadas: number;

  @CreateDateColumn({type: 'timestamp'})
  creado_en: Date

}