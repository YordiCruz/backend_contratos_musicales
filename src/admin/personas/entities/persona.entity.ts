import { Integrante } from 'src/admin/integrantes/entities/integrante.entity';
import { User } from 'src/admin/users/entities/user.entity';
import { Client } from 'src/client/clients/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('persons')
export class Persona {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  apellido: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  documento_identidad: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  telefono: string;

  @CreateDateColumn()
  creado_en: Date;

  @UpdateDateColumn()
  actualizado_en: Date;

  @OneToOne(() => User, (user) => user.persona)
  user: User;

  @OneToOne(() => Client, (cliente) => cliente.persona)
  cliente: Client;

  @OneToOne(() => Integrante, (integrante) => integrante.persona)
  integrante: Integrante
}
