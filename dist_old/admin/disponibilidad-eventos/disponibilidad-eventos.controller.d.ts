import { DisponibilidadEventosService } from './disponibilidad-eventos.service';
export declare class DisponibilidadEventosController {
    private readonly disponibilidadService;
    constructor(disponibilidadService: DisponibilidadEventosService);
    getDisponibilidadPorMes(año: number, mes: number): Promise<import("./entities/disponibilidad-evento.entity").DisponibilidadEvento[]>;
    getDisponibilidadPorDia(fecha: string): Promise<import("./entities/disponibilidad-evento.entity").DisponibilidadEvento[]>;
    ocupar(data: {
        fecha: string;
        bloque: string;
        contratoId: string;
    }): Promise<import("./entities/disponibilidad-evento.entity").DisponibilidadEvento>;
    liberar(data: {
        fecha: string;
        bloque: string;
    }): Promise<import("./entities/disponibilidad-evento.entity").DisponibilidadEvento>;
}
