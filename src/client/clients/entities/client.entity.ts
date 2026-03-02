import { Contrato } from "src/admin/contratos/entities/contrato.entity";
import { Persona } from "src/admin/personas/entities/persona.entity";
import { User } from "src/admin/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('clients')
export class Client {
 
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => Persona, { eager: true, cascade: false })
  @JoinColumn({ name: 'id_persona' })
  persona: Persona;

  @Column({ type: 'varchar', length: 20, default: 'individual' })
  tipo_cliente: string; // individual | empresa

  @Column({ type: 'varchar', length: 20, default: 'web' })
  origen_registro: string; // web | admin | bot

  @Column({ type: 'varchar', length: 20, default: 'normal' })
  categoria: string; // normal | vip | frecuente

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  saldo_pendiente: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  limite_credito: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 })
  descuentos: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  contacto_secundario: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  preferencia_contacto: string; // whatsapp | email | telefono

  
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





}
