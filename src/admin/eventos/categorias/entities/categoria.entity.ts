import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Evento } from "../../eventos/entities/evento.entity";

@Entity('categories_events')
export class Categoria {

  @PrimaryGeneratedColumn('uuid')
  id_categoria: string;

  @Column({ length: 100, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'varchar', length: 20, default: 'activo' })
  estado: string;

  @OneToMany(() => Evento, evento => evento.categoria)
  eventos: Evento[];

  @Column({ type: 'varchar', length: 100, nullable: true })
  creado_por: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  actualizado_por: string;


  @Column({ type: 'timestamp', nullable: true })
  creado_en: Date;

  @Column({ type: 'timestamp', nullable: true})
  actualizado_en: Date;

  @Column({ type: 'timestamp', nullable: true })
  eliminado_en: Date;


}
