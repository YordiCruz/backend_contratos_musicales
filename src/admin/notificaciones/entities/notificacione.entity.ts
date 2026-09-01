import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Persona } from "../../personas/entities/persona.entity";
import { Contrato } from "../../contratos/entities/contrato.entity";
import { User } from "../../users/entities/user.entity";
import { Pago } from "../../pagos/entities/pago.entity";

@Entity('notificaciones')
export class Notificacione {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  tipo: string; // INTEGRANTE | REEMPLAZO | CLIENTE | ADMIN

  @Column({ type: 'text' })
  mensaje: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;


@ManyToOne(() => Contrato, { eager: true, nullable: true })
  @JoinColumn({ name: 'contrato_id' })
  contrato: Contrato | null;

  @Column({ default: 'pendiente' })
  estado: 'pendiente' | 'aceptado' | 'rechazado';

@Column({ default: false })
leido: boolean;

@ManyToOne(() => Pago, {
  nullable: true,
  eager: true,
})
@JoinColumn({ name: 'pago_id' })
pago?: Pago | null;


@Column({
  type: 'enum',
  enum: ['PAGO', 'CONTRATO', 'INTEGRANTE', 'CLIENTE', 'ADMIN', 'ADMIN_RESUMEN' , 'RECHAZADO', 'ADELANTO', 'APROBADO', 'CLIENTE_ACEPTO', 'CLIENTE_RECHAZO', 'RECUPERAR_PASSWORD'],
})
accion: string;

  
@Column({
  type: 'uuid',
  nullable: true
})
usuarioOrigenId?: string;

}
