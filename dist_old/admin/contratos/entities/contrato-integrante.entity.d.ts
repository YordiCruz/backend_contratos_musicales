import { Contrato } from './contrato.entity';
import { Integrante } from '../../integrantes/entities/integrante.entity';
export declare class ContratoIntegrante {
    id_contrato: string;
    id_integrante: string;
    contrato: Contrato;
    integrante: Integrante;
    especialidad: string;
    compensacion_hora: number;
    horas_contratadas: number;
    estado: string;
    creado_en: Date;
}
