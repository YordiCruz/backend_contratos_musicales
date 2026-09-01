import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Contrato } from '../../contratos/entities/contrato.entity';
import { User } from '../../users/entities/user.entity';


export enum MetodoPago { EFECTIVO = 'efectivo', QR = 'qr', TRANSFERENCIA = 'transferencia', ONLINE = 'online' }
export enum TipoPago { ADELANTO = 'adelanto', PAGO_PARCIAL = 'pago_parcial', EXTRA = 'extra' }
export enum EstadoPago { PENDIENTE = 'pendiente', APROBADO = 'aprobado', RECHAZADO = 'rechazado', PAGO_COMPLETO = 'pago_completo' }


@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn('uuid')
  id_pago: string;

  @ManyToOne(() => Contrato, contrato => contrato.pagos)
@JoinColumn({ name: 'id_contrato', referencedColumnName: 'id_contrato' })
contrato: Contrato;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'enum', enum: MetodoPago, nullable: true })
  metodo: MetodoPago; // efectivo, qr, transferencia, online

  @Column({ type: 'enum', enum: TipoPago, nullable: true })
  tipo: TipoPago;

  @Column({ type: 'varchar', length: 100, nullable: true })
  referencia: string;


  @Column({
  type: 'timestamp',
  nullable: true
})
fecha_solicitud: Date | null;


  @Column({ type: 'timestamp',nullable: true })
  fecha_pago: Date | null;

  @ManyToOne(() => User, usuario => usuario.pagos, { eager: true })
  @JoinColumn({ name: 'registrado_por' })
  registrado_por: User;

  @Column({ type: 'enum', enum: EstadoPago, default: 'pendiente' })
estado: EstadoPago;

@Column({ type: 'varchar', length: 50, nullable: true })
proveedor: string;

@CreateDateColumn({ type: 'timestamp' })
creado_en: Date;



}