export enum TipoNotificacion {
  INTEGRANTE = 'INTEGRANTE',
  REEMPLAZO = 'REEMPLAZO',
  CLIENTE = 'CLIENTE',
  ADMIN = 'ADMIN',
  ADMIN_RESUMEN = 'ADMIN_RESUMEN',
}

export class CreateNotificacioneDto {
  tipo: TipoNotificacion;
  destinatarioId: string;   // Persona.id
  contratoId: string;       // Contrato.id_contrato
  mensaje: string;
  fecha: Date;
  pagoId?: string;
  accion: 'PAGO' | 'CONTRATO' | 'INTEGRANTE' | 'CLIENTE' | 'ADMIN' | 'ADMIN_RESUMEN' | 'RECHAZADO' | 'ADELANTO' | 'APROBADO' | 'CLIENTE_ACEPTO' | 'CLIENTE_RECHAZO' | 'RECUPERAR_PASSWORD';
  usuarioOrigenId?:string

}