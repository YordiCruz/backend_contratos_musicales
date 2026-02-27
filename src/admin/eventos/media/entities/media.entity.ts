import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Evento } from "../../eventos/entities/evento.entity";

@Entity('media_events')
export class Media {

  @PrimaryGeneratedColumn('uuid')
  id_media: string;

  @ManyToOne(() => Evento, evento => evento.media)
  evento: Evento;

  @Column({ length: 10 })
  tipo: string; // imagen, video

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ nullable: true })
  orden?: number;

  @Column({ default: true })
  visibilidad_publica: boolean;

  @CreateDateColumn()
  creado_en: Date;

}
