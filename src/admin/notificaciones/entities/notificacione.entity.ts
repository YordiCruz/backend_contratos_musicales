import { Contrato } from "src/admin/contratos/entities/contrato.entity";
import { Persona } from "src/admin/personas/entities/persona.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @ManyToOne(() => Persona, { eager: true })
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;

  @ManyToOne(() => Contrato, { eager: true })
  @JoinColumn({ name: 'contrato_id' })
  contrato: Contrato;

  @Column({ default: 'pendiente' })
  estado: 'pendiente' | 'aceptado' | 'rechazado';



}
