import { Contrato } from './contrato.entity';
import { Reemplazo } from 'src/admin/reemplazos/entities/reemplazo.entity';
export declare class ContratoReemplazo {
    id_contrato: string;
    id_reemplazo: string;
    contrato: Contrato;
    reemplazo: Reemplazo;
    especialidad: string;
    estado: string;
    compensacion_hora: number;
    horas_contratadas: number;
    creado_en: Date;
}
