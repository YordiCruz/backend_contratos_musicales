<<<<<<< HEAD
import { Contrato } from 'src/admin/contratos/entities/contrato.entity';
=======
>>>>>>> develop
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Contrato, contrato => contrato.id_contrato, { nullable: true })
<<<<<<< HEAD
  contrato: Contrato | null;
=======
  contrato: Contrato;
>>>>>>> develop
}