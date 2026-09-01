import {
 Entity,
 PrimaryGeneratedColumn,
 Column,
 CreateDateColumn,
 UpdateDateColumn
} from 'typeorm';


@Entity('solicitudes_recuperacion')
export class SolicitarRecuperacion {


 @PrimaryGeneratedColumn('uuid')
 id_solicitud:string;


 @Column()
 correo:string;


 @Column({
   default:'pendiente'
 })
 estado:string;


 @Column({
   nullable:true
 })
 atendido_por:string;


 @CreateDateColumn()
 fecha_solicitud:Date;


 @UpdateDateColumn()
 fecha_actualizacion:Date;

 @Column({
  nullable: true
 })
 userOrigenId:string;


}