
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Persona } from "../../personas/entities/persona.entity";
import { Contrato } from "../../contratos/entities/contrato.entity";
import { User } from "../../users/entities/user.entity";

@Entity('clients')
export class Client {
 
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => Persona, { cascade: false })
  @JoinColumn({ name: 'id_persona' })
  persona: Persona;

  @Column({ type: 'varchar', length: 20, default: 'individual' })
  tipo_cliente: string; // individual | empresa

  @Column({ type: 'varchar', length: 20, default: 'web' })
  origen_registro: string; // web | admin | bot
  
  @Column({ type: 'varchar', length: 20, nullable: true })
  preferencia_contacto: string; // whatsapp | email 

  
  @OneToMany(() => Contrato, contrato => contrato.cliente)
  contratos: Contrato[]


  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'registrado_por' })
  registrado_por: User;

  @CreateDateColumn({ name: 'creado_en' })
  creado_en: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizado_en: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  eliminado_en: Date | null;

  @Column({ type: 'varchar', length: 20, default: 'activo' })
  estado: string;

@OneToOne(() => User, (user) => user.cliente)
@JoinColumn({ name: 'user_id' })
user: User;


}
