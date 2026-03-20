import { Contrato } from './contrato.entity';
export declare class Ubicacion {
    id_ubicacion: string;
    nombre: string;
    direccion: string;
    latitud: number;
    longitud: number;
    capacidad: number;
    contratos: Contrato[];
}
