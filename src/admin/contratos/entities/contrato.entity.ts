import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Ubicacion } from './ubicacion.entity';
import { Client } from 'src/client/clients/entities/client.entity';
import { Evento } from 'src/admin/eventos/eventos/entities/evento.entity';
import { ContratoIntegrante } from './contrato-integrante.entity';
import { ContratoReemplazo } from './contrato-reemplazo.entity';
import { ContratoEspecialidad } from './contrato-especialidad.entity';
import { DisponibilidadEvento } from 'src/admin/disponibilidad-eventos/entities/disponibilidad-evento.entity';
import { Pago } from 'src/admin/pagos/entities/pago.entity';

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

  @Column({ type: 'int', default: 0 })
horas_extra: number;

  @Column({ type: 'boolean', default: 'false' })
  admin_aprobacion: boolean;

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

  @OneToMany(() => DisponibilidadEvento, disp => disp.contrato)
disponibilidades: DisponibilidadEvento[];

}