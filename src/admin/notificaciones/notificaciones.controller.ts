import { Controller, Post, Param, Body, Get, Req, UseGuards, Patch } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { PersonasService } from '../personas/personas.service';
import { ContratosService } from '../contratos/contratos.service';
import { CreateNotificacioneDto, TipoNotificacion } from './dto/create-notificacione.dto';
import { SugerenciaDTO } from '../contratos/dto/resumen-contrato.dto';
import { UsersService } from '../users/users.service';
import { AdminJwtGuard } from '../../auth/admin-auth/guards/admin-jwt.guard';
import { ClientJwtGuard } from '../../auth/client-auth/guards/client-jwt.guard';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(
    private readonly notificacionService: NotificacionesService,
    private readonly contratoService: ContratosService,
    private readonly userService: UsersService,
  ) {}


@Post('contratos/:contratoId/notificar-reemplazos')
async notificarReemplazos(@Param('contratoId') contratoId: string) {
  return this.notificacionService.notificaReemplazos(contratoId);
}


  @Post(':contratoId/reemplazo/:personaId')
  async notificarReemplazo(
    @Param('contratoId') contratoId: string,
    @Param('userId') userId: string,
  ) {
    const contrato = await this.contratoService.getContrato(contratoId);
    const user = await this.userService.findOne(userId);

    const dto: CreateNotificacioneDto = await this.notificacionService.generarNotificacion(
      TipoNotificacion.REEMPLAZO,
      contrato,
      user,
    );

    return this.notificacionService.enviar(dto);
  }

  @Post(':contratoId/cliente/:personaId')
  async notificarCliente(
    @Param('contratoId') contratoId: string,
    @Param('userId') userId: string,
  ) {
    const contrato = await this.contratoService.getContrato(contratoId);
    const user = await this.userService.findOne(userId);

    const dto: CreateNotificacioneDto = await this.notificacionService.generarNotificacion(
      TipoNotificacion.CLIENTE,
      contrato,
      user,
    );

    return this.notificacionService.enviar(dto);
  }

  @Post(':contratoId/admin/:personaId')
  async notificarAdmin(
    @Param('contratoId') contratoId: string,
    @Param('userId') userId: string,
  ) {
    const contrato = await this.contratoService.getContrato(contratoId);
    const user = await this.userService.findOne(userId);

    const dto: CreateNotificacioneDto = await this.notificacionService.generarNotificacion(
      TipoNotificacion.ADMIN,
      contrato,
      user,
    );

    return this.notificacionService.enviar(dto);
  }


 @UseGuards(AdminJwtGuard)
@Get('/mis-notificaciones')
obtenerAdmin(@Req() req) {
  return this.notificacionService.obtenerMisNotificaciones(req.user.id);
}


@UseGuards(ClientJwtGuard)
@Get('/mis-notificacione')
obtenerCliente(@Req() req) {
  return this.notificacionService.obtenerMisNotificaciones(req.user.id);
}

@Patch(':id/leida')
marcarComoLeida(
  @Param('id') id: string
) {
  return this.notificacionService.marcarComoLeida(id);
}


}