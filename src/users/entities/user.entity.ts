import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users') //aqui definimos el nombre de la tabla 
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
        unique: true
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    password_hash: string;

    @Column({
        type: "timestamp",
        nullable: true
    })
    ultimo_login: Date;

    @Column({
        type: 'varchar',
        length: 20,
        default: 'activo'
    })
    estado: string;

    @Column({
        type: 'varchar',
        length: 20,
        default: 'admin'
    })
    origen_registro: string;


    @CreateDateColumn()
    creado_en: Date;

    @UpdateDateColumn()
    actualizado_en: Date;


    @Column({ type: 'timestamp', nullable: true })
    deleted_at: Date | null;



}
