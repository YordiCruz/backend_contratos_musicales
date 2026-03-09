import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categorias/entities/categoria.entity";
import { User } from "src/admin/users/entities/user.entity";
import { Media } from "../../media/entities/media.entity";
import { Contrato } from "src/admin/contratos/entities/contrato.entity";

@Entity('events')
export class Evento {

  @PrimaryGeneratedColumn('uuid')
  id_evento: string;

  @ManyToOne(() => Categoria, categoria => categoria.eventos)
  categoria: Categoria;

  @Column({ length: 100, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ length: 20, default: 'planificado' })
  estado: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_base: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  descuento: number;

  @OneToMany(() => Contrato, contrato => contrato.evento)
  contratos: Contrato[];

  @ManyToOne(() => User, usuario => usuario.eventos_registrados)
  creado_por: User;

  @CreateDateColumn()
  creado_en: Date;

  @OneToMany(() => Media, media => media.evento)
  media: Media[];


}
