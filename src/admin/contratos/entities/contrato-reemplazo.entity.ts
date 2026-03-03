import { Entity, Column, ManyToOne, PrimaryColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import { Contrato } from './contrato.entity';
import { Reemplazo } from 'src/admin/reemplazos/entities/reemplazo.entity';

@Entity('contrato_reemplazo')
export class ContratoReemplazo {
  @PrimaryColumn('uuid')
  id_contrato: string;

  @PrimaryColumn('uuid')
  id_reemplazo: string;

  @ManyToOne(() => Contrato, contrato => contrato.reemplazos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_contrato' })
  contrato: Contrato;

  @ManyToOne(() => Reemplazo, reempla => reempla.contratos, { eager: true })
  @JoinColumn({ name: 'id_reemplazo' })
  reemplazo: Reemplazo;

  @Column({ type: 'varchar', length: 50 })
  especialidad: string;

  @Column({ type: 'varchar', length: 20, default: 'pendiente' })
  estado: string; // pendiente | aceptado | rechazado

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  compensacion_hora: number;

  @Column({ type: 'int' })
  horas_contratadas: number;

  @CreateDateColumn({type: 'timestamp'})
  creado_en: Date

}