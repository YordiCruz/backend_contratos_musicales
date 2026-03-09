import { Pago } from "src/admin/contratos/entities/pago.entity";
import { Evento } from "src/admin/eventos/eventos/entities/evento.entity";
import { Persona } from "src/admin/personas/entities/persona.entity";
import { Reemplazo } from "src/admin/reemplazos/entities/reemplazo.entity";
import { Role } from "src/admin/roles/entities/role.entity";
import { Client } from "src/client/clients/entities/client.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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



    @ManyToMany(() => Role, (role) => role.user)
    @JoinTable({
        name: 'user_roles',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        }
    })
    roles: Role[]

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'registrado_por' })
    registrado_por: User;

    @OneToOne(()=> Persona, (persona) => persona.user)
    @JoinColumn({name: 'persona_id'})
    persona: Persona

    @OneToMany(() => Client, (cliente) => cliente.registrado_por)
    clientes_registrados: Client[];

    @OneToMany(() => Reemplazo, (reemplazo) => reemplazo.registrado_por)
    reemplazos_registrados: Reemplazo[]
    
    
    @OneToMany(() => Evento, (evento) => evento.creado_por)
    eventos_registrados: Evento[]
    
    @CreateDateColumn({ type: 'timestamp' })
    creado_en: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    actualizado_en: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    eliminado_en: Date | null;

    @OneToMany(() => Pago, (pago) => pago.registrado_por)
    pagos: Pago[]

}
