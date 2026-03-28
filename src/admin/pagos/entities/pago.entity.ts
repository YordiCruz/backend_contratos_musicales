import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/admin/users/entities/user.entity';
import { Contrato } from 'src/admin/contratos/entities/contrato.entity';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn('uuid')
  id_pago: string;

  @ManyToOne(() => Contrato, contrato => contrato.pagos, { eager: true })
  contrato: Contrato;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'varchar', length: 50 })
  metodo: string; // efectivo, qr, transferencia, online

  @Column({ type: 'varchar', length: 20 })
  tipo: string; // adelanto, saldo, extra

  @Column({ type: 'varchar', length: 100, nullable: true })
  referencia: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_pago: Date;

  @ManyToOne(() => User, usuario => usuario.pagos, { eager: true })
  registrado_por: User;

  @Column({ type: 'varchar', length: 20, default: 'pendiente' })
estado: string;

@Column({ type: 'varchar', length: 50, nullable: true })
proveedor: string;

@Column({ type: 'varchar', length: 100, nullable: true })
transaccion_id: string;

@Column({ type: 'json', nullable: true })
payload: any;



}