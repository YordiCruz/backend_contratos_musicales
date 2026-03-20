export declare enum TipoNotificacion {
    INTEGRANTE = "INTEGRANTE",
    REEMPLAZO = "REEMPLAZO",
    CLIENTE = "CLIENTE",
    ADMIN = "ADMIN",
    ADMIN_RESUMEN = "ADMIN_RESUMEN"
}
export declare class CreateNotificacioneDto {
    tipo: TipoNotificacion;
    destinatarioId: string;
    contratoId: string;
    mensaje: string;
    fecha: Date;
}
