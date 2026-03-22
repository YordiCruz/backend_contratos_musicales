import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Evento } from "../../eventos/entities/evento.entity";

@Entity('media_events')
export class Media {

  @PrimaryGeneratedColumn('uuid')
  id_media: string;

  // 🔥 PRIMERO LA FK
  @Column()
  id_evento: string;

  // 🔥 LUEGO LA RELACIÓN
  @ManyToOne(() => Evento, evento => evento.media, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_evento' })
  evento: Evento;

  @Column({ length: 10 })
  tipo: string; // imagen | video

  @Column({ type: 'text' })
  url: string;

  // 🔥 PERMITIR NULL EXPLÍCITAMENTE
  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({ nullable: true })
  orden?: number;

  @Column({ default: true })
  visibilidad_publica: boolean;

  @CreateDateColumn()
  creado_en: Date;

  @UpdateDateColumn()
  actualizado_en: Date;

  @DeleteDateColumn()
  eliminado_en: Date;
}