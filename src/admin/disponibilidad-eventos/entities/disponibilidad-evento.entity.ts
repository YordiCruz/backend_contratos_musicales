import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Contrato } from '../../contratos/entities/contrato.entity';

@Entity('disponibilidad_eventos')
export class DisponibilidadEvento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'varchar', length: 20 })
  bloque: string; // mañana | noche

  @Column({ type: 'varchar', length: 20, default: 'libre' })
  estado: string; // libre | ocupado

  @ManyToOne(() => Contrato, contrato => contrato.disponibilidades, { nullable: true })
  @JoinColumn({ name: 'id_contrato' })
  contrato: Contrato | null;
  
}