import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contrato } from './contrato.entity';

@Entity('ubicaciones')
export class Ubicacion {
  @PrimaryGeneratedColumn('uuid')
  id_ubicacion: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text' })
  direccion: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  latitud: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  longitud: number;

  //cuantas personas seran
  @Column({ type: 'int', nullable: true })
  capacidad: number;

  @OneToMany(() => Contrato, contrato => contrato.ubicacion)
  contratos: Contrato[];
}