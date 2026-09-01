import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('datos_empresa')
export class DatosEmpresa {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    nombre_empresa: string;

    @Column({ length: 100 })
    nombre_lugar: string;

    @Column({ length: 100 })
    propietario: string;

    @Column({ length: 100 })
    telefono: string;

    @Column({ length: 150 })
    email: string;

    @Column({ type: 'decimal', precision: 10, scale: 6 })
    latitud: number;

    @Column({ type: 'decimal', precision: 10, scale: 6 })
    longitud: number;

    @Column({ length: 255 })
    direccion: string;

    @Column({ length: 100, nullable: true })
    ciudad: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    documento_identidad: string;
}
