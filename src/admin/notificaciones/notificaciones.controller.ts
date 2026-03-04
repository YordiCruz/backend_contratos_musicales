import { Controller, Post, Body, Param } from '@nestjs/common';
import { TipoNotificacion, NotificacionDTO } from './dto/notificacion.dto';
import { NotificacionesService } from './notificaciones.service';
import { PersonasService } from '../personas/personas.service';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(
    private readonly notificacionService: NotificacionesService,
    private readonly contratoService: ContratoService,
    private readonly personaService: PersonasService,
  ) {}

  @Post(':contratoId/integrante/:personaId')
  async notificarIntegrante(
    @Param('contratoId') contratoId: string,
    @Param('personaId') personaId: string,
  ) {
    const contrato = await this.contratoService.findById(contratoId);
    const persona = await this.personaService.findOne(personaId);

    const dto: NotificacionDTO = await this.notificacionService.generarNotificacion(
      TipoNotificacion.INTEGRANTE,
      contrato,
      persona,
    );

    return this.notificacionService.enviar(dto);
  }

  @Post(':contratoId/reemplazo/:personaId')
  async notificarReemplazo(
    @Param('contratoId') contratoId: string,
    @Param('personaId') personaId: string,
  ) {
    const contrato = await this.contratoService.findById(contratoId);
    const persona = await this.personaService.findOne(personaId);

    const dto: NotificacionDTO = await this.notificacionService.generarNotificacion(
      TipoNotificacion.REEMPLAZO,
      contrato,
      persona,
    );

    return this.notificacionService.enviar(dto);
  }

  @Post(':contratoId/cliente/:personaId')
  async notificarCliente(
    @Param('contratoId') contratoId: string,
    @Param('personaId') personaId: string,
  ) {
    const contrato = await this.contratoService.findById(contratoId);
    const persona = await this.personaService.findOne(personaId);

    const dto: NotificacionDTO = await this.notificacionService.generarNotificacion(
      TipoNotificacion.CLIENTE,
      contrato,
      persona,
    );

    return this.notificacionService.enviar(dto);
  }

  @Post(':contratoId/admin/:personaId')
  async notificarAdmin(
    @Param('contratoId') contratoId: string,
    @Param('personaId') personaId: string,
  ) {
    const contrato = await this.contratoService.findById(contratoId);
    const persona = await this.personaService.findOne(personaId);

    const dto: NotificacionDTO = await this.notificacionService.generarNotificacion(
      TipoNotificacion.ADMIN,
      contrato,
      persona,
    );

    return this.notificacionService.enviar(dto);
  }
}