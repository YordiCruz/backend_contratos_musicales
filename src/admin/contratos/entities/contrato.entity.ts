import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Ubicacion } from './ubicacion.entity';
import { Pago } from './pago.entity';
import { Client } from 'src/client/clients/entities/client.entity';
import { Evento } from 'src/admin/eventos/eventos/entities/evento.entity';
import { Integrante } from 'src/admin/integrantes/entities/integrante.entity';
import { ContratoIntegrante } from './contrato-integrante.entity';
import { ContratoReemplazo } from './contrato-reemplazo.entity';
import { ContratoEspecialidad } from './contrato-especialidad.entity';

@Entity('contratos')
export class Contrato {
  @PrimaryGeneratedColumn('uuid')
  id_contrato: string;

  @ManyToOne(() => Client, cliente => cliente.contratos, { eager: true })
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

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  adelanto: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  saldo: number;

  @Column({ type: 'boolean', default: 'false' })
  admin_aprobacion: boolean;

  @Column({ type: 'date', nullable: true })
  fecha_adelanto: Date;

  @Column({ type: 'varchar', length: 20, default: 'pendiente' })
  estado: string;

  @Column({ type: 'varchar', length: 100, nullable: true})
  motivo_cancelacion:string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;

  @OneToMany(() => Pago, pago => pago.contrato)
  pagos: Pago[];

  @OneToMany(() => ContratoEspecialidad, ce => ce.contrato, { cascade: true })
  especialidades: ContratoEspecialidad[];

}