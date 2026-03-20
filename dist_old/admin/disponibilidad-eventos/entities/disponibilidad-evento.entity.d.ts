import { Contrato } from 'src/admin/contratos/entities/contrato.entity';
export declare class DisponibilidadEvento {
    id: string;
    fecha: Date;
    bloque: string;
    estado: string;
    contrato: Contrato | null;
}
