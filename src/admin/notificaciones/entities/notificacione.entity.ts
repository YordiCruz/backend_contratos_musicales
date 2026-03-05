import { Persona } from "src/admin/personas/entities/persona.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  personaId: string;

  @Column()
  contratoId: string;

  @ManyToOne(() => Persona)
  persona: Persona;

  @ManyToOne(() => Contrato)
  contrato: Contrato;


}
