import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Client } from '../../clients/entities/client.entity';
import { Integrante } from '../../integrantes/entities/integrante.entity';
import { Reemplazo } from '../../reemplazos/entities/reemplazo.entity';

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

  
 @Column({type: 'varchar', length: 20, default: 'activo'})
    estado: string
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

  @OneToOne(() => Reemplazo, (reemplazo) => reemplazo.persona)
  reemplazo: Reemplazo
}
