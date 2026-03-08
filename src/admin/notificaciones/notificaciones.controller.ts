import { Controller, Post, Param, Body } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { PersonasService } from '../personas/personas.service';
import { ContratosService } from '../contratos/contratos.service';
import { CreateNotificacioneDto, TipoNotificacion } from './dto/create-notificacione.dto';
import { SugerenciaDTO } from '../contratos/dto/resumen-contrato.dto';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(
    private readonly notificacionService: NotificacionesService,
    private readonly contratoService: ContratosService,
    private readonly personaService: PersonasService,
  ) {}


@Post('contratos/:contratoId/notificar-reemplazos')
async notificarReemplazos(@Param('contratoId') contratoId: string) {
  return this.notificacionService.notificaReemplazos(contratoId);
}


  @Post(':contratoId/reemplazo/:personaId')
  async notificarReemplazo(
    @Param('contratoId') contratoId: string,
    @Param('personaId') personaId: string,
  ) {
    const contrato = await this.contratoService.getContrato(contratoId);
    const persona = await this.personaService.findOne(personaId);

    const dto: CreateNotificacioneDto = await this.notificacionService.generarNotificacion(
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
    const contrato = await this.contratoService.getContrato(contratoId);
    const persona = await this.personaService.findOne(personaId);

    const dto: CreateNotificacioneDto = await this.notificacionService.generarNotificacion(
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
    const contrato = await this.contratoService.getContrato(contratoId);
    const persona = await this.personaService.findOne(personaId);

    const dto: CreateNotificacioneDto = await this.notificacionService.generarNotificacion(
      TipoNotificacion.ADMIN,
      contrato,
      persona,
    );

    return this.notificacionService.enviar(dto);
  }
}