export declare class CreateContratoDto {
    id_cliente: string;
    id_evento: string;
    id_ubicacion: string;
    fecha_evento: Date;
    bloque: string;
    hora_inicio?: string;
    hora_fin?: string;
    tipo_servicio?: string;
    horas_contratadas?: number;
    adelanto?: number;
    saldo?: number;
    fecha_adelanto?: Date;
}
