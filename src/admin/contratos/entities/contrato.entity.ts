import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinColumn } from 'typeorm';
import { Ubicacion } from './ubicacion.entity';

import { ContratoIntegrante } from './contrato-integrante.entity';
import { ContratoReemplazo } from './contrato-reemplazo.entity';
import { ContratoEspecialidad } from './contrato-especialidad.entity';
import { Client } from '../../clients/entities/client.entity';
import { Evento } from '../../eventos/eventos/entities/evento.entity';
import { Pago } from '../../pagos/entities/pago.entity';
import { DisponibilidadEvento } from '../../disponibilidad-eventos/entities/disponibilidad-evento.entity';


export enum EstadoContrato {
  PENDIENTE = 'pendiente',
  CONFIRMADO = 'confirmado',
  EN_PROCESO = 'en_proceso',
  FINALIZADO_PENDIENTE_PAGO = 'con_deuda',
  CANCELADO = 'cancelado',
  FINALIZADO = 'finalizado',
  RECHAZADO = 'rechazado'

}

export enum estadopago{
  SIN_SOLICITAR = 'sin_solicitar',
  ADELANTO_REQUERIDO = 'adelanto_requerido',
  PAGADO_PARCIAL = 'pagado_parcial',
  PAGADO_TOTAL = 'pagado_total',
}
@Entity('contratos')
export class Contrato {
  @PrimaryGeneratedColumn('uuid')
  id_contrato: string;

@ManyToOne(() => Client, cliente => cliente.contratos)
@JoinColumn({ name: 'clienteId' })
cliente: Client;

  @ManyToOne(() => Evento, evento => evento.contratos, { eager: true })
  evento: Evento;

  @OneToMany(() => ContratoIntegrante, contratoIntegrante => contratoIntegrante.contrato, { cascade: true })
  integrantes: ContratoIntegrante[];

  @OneToMany(() => ContratoReemplazo, contratoReemplazo => contratoReemplazo.contrato, { cascade: true })
  reemplazos: ContratoReemplazo[];

  @ManyToOne(() => Ubicacion, ubicacion => ubicacion.contratos, { eager: true })
  ubicacion: Ubicacion;

  @Column({ type: 'date' })
  fecha_evento: Date;

  @Column({ type: 'varchar', length: 20 })
  bloque: string; // mañana | noche

  @Column({ type: 'time', nullable: true })
  hora_inicio: string;

  @Column({ type: 'time', nullable: true })
  hora_fin: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  tipo_servicio: string;

  @Column({ type: 'int', nullable: true })
  horas_contratadas: number;

  @Column({ type: 'int', default: 0 })
horas_extra: number;

  @Column({ type: 'boolean', default: 'false' })
  admin_aprobacion: boolean;

  @Column({ type: 'varchar', length: 20, default: EstadoContrato.PENDIENTE })
  estado: EstadoContrato;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;

  @OneToMany(() => Pago, pago => pago.contrato)
  pagos: Pago[];

  @OneToMany(() => ContratoEspecialidad, ce => ce.contrato, { cascade: true })
  especialidades: ContratoEspecialidad[];

  @OneToMany(() => DisponibilidadEvento, disp => disp.contrato)
disponibilidades: DisponibilidadEvento[];

@Column({ type: 'boolean', default: false })
cliente_acepto_contrato: boolean;

@Column({ type: 'date', nullable: true })
cliente_fecha_aceptacion: Date;

@Column({ type: 'text', nullable: true })
cliente_motivo_cancelacion?: string;

@Column({ type: 'text', nullable: true })
pdf_url: string;

@Column({ type: 'varchar', length: 50, nullable: true })
cliente_contrato_estado: string;

@Column({
  unique: true
})
numero_contrato: string;

@Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
descuento: number;

@Column({ type: 'decimal', precision: 10, scale: 2 })
monto_final: number;

@Column({ type: 'decimal', precision:10, scale: 2, default: 0})
precio_original:number;

@Column({ type: 'decimal', precision:10, scale: 2, default: 0})
total_pagado:number;

@Column({ type: 'decimal', precision:10, scale: 2, default: 0})
saldo:number;

@Column({ type: 'decimal', precision:10, scale: 2, default: 0})
porcentaje_descuento?: number;

@Column({ type: 'enum', enum: estadopago, default: estadopago.SIN_SOLICITAR })
estado_pago: estadopago;

@Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 30
})
porcentaje_adelanto: number;


}

