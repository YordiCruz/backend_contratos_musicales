export declare class CreateClientDataDto {
    tipo_cliente: string;
    origen_registro: string;
    categoria: string;
    saldo_pendiente?: number;
    limite_credito?: number;
    descuentos?: number;
    contacto_secundario?: string;
    preferencia_contacto?: string;
    estado?: string;
}
