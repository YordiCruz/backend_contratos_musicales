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
}