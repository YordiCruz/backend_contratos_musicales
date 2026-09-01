import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categoria } from "../../categorias/entities/categoria.entity";
import { Media } from "../../media/entities/media.entity";
import { Contrato } from "../../../contratos/entities/contrato.entity";
import { User } from "../../../users/entities/user.entity";

@Entity('events')
export class Evento {

  @PrimaryGeneratedColumn('uuid')
  id_evento: string;

 @ManyToOne(() => Categoria, categoria => categoria.eventos)
@JoinColumn({ name: 'id_categoria' })
categoria: Categoria;

@Column()
id_categoria: string;

  @Column({ length: 100, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ length: 20, default: 'activo' })
  estado: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_base: number;


  @OneToMany(() => Contrato, contrato => contrato.evento)
  contratos: Contrato[];

  @ManyToOne(() => User, usuario => usuario.eventos_registrados)
@JoinColumn({ name: 'creado_por' })
creado_por: User;

@Column( { nullable: true })
creado_por_id: string;

  @CreateDateColumn({ type: 'timestamp'})
  creado_en: Date;

  @UpdateDateColumn({ type: 'timestamp' })
actualizado_en: Date;

@Column({ nullable: true })
actualizado_por: string;

@DeleteDateColumn()
eliminado_en: Date;


  @OneToMany(() => Media, media => media.evento)
  media: Media[];


}
