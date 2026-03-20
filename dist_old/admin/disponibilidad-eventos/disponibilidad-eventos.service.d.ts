import { Repository } from 'typeorm';
import { DisponibilidadEvento } from './entities/disponibilidad-evento.entity';
export declare class DisponibilidadEventosService {
    private disponibilidadRepo;
    constructor(disponibilidadRepo: Repository<DisponibilidadEvento>);
    getDisponibilidadPorMes(año: number, mes: number): Promise<DisponibilidadEvento[]>;
    getDisponibilidadPorDia(fecha: Date): Promise<DisponibilidadEvento[]>;
    marcarOcupado(fecha: Date, bloque: string, contratoId: string): Promise<DisponibilidadEvento>;
    marcarLibre(fecha: Date, bloque: string): Promise<DisponibilidadEvento>;
}
