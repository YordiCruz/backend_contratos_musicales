import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Req } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { ContratoReemplazo } from './entities/contrato-reemplazo.entity';
import { Contrato } from './entities/contrato.entity';
import { AsignarIntegrantesDto } from './dto/asignar-integrante.dto';
import { NotificacionesService } from '../notificaciones/notificaciones.service';


@Controller('contratos')
export class ContratosController {
  constructor(
    private readonly contratosService: ContratosService,
    private readonly notificacionesService: NotificacionesService,

  ) {}

  // Crear contrato pendiente
  @Post()
  create(@Body() createContratoDto: CreateContratoDto) {
    return this.contratosService.createContrato(createContratoDto);
  }

  // Obtener contrato por id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contratosService.getContrato(id);
  }

  @Get()
  findAll() {
    return this.contratosService.getAllContratos();
  }

  // Confirmar contrato (asignar integrantes y marcar disponibilidad)
 @Post(':id/confirmar')
  async confirmarContrato(@Param('id') contratoId: string) {
    return this.contratosService.confirmarContrato(contratoId);
  }



  // Rechazar contrato (cambia estado a rechazado)
  @Patch(':id/rechazar')
  async rechazar(@Param('id') id: string) {
    const contrato = await this.contratosService.getContrato(id);
    contrato.estado = 'rechazado';
    return this.contratosService.updateContrato(id, contrato);
  }

  // Actualizar contrato (ejemplo genérico)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContratoDto: UpdateContratoDto) {
    return this.contratosService.updateContrato(id, updateContratoDto);
  }

  // Eliminar contrato
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contratosService.removeContrato(id);
  }


   // 🔹 Reabrir contrato
  @Patch(':id/reabrir')
  async reabrirContrato(@Param('id') id: string) {
    return this.contratosService.reabrirContrato(id);
  }

  // 🔹 Rechazar contrato
  @Patch(':id/rechazar')
  async rechazarContrato(
    @Param('id') id: string,
    @Body('motivo') motivo?: string,
  ) {
    return this.contratosService.rechazarContrato(id, motivo);
  }


@Post(':id/integrantes')
async asignarIntegrantes(
  @Param('id') contratoId: string,
  @Body() dto: AsignarIntegrantesDto,
): Promise<Contrato> {
  if (!dto.integrantes || dto.integrantes.length === 0) {
    throw new NotFoundException('Debe especificar al menos un integrante');
  }

  for (const item of dto.integrantes) {
    await this.contratosService.asignarIntegranteAlContrato(contratoId, item);
  }

  return this.contratosService.obtenerContratoConIntegrantes(contratoId);
}


  // Endpoint para asignar un reemplazo a un contrato
 
  @Post(':id/reemplazo')
  async asignarReemplazo(
    @Param('id') contratoId: string,
    @Body() data: {
      id_reemplazo: string;
      id_especialidad: string;
      horas_contratadas?: number;
      aceptado?: boolean;
    },
  ): Promise<ContratoReemplazo | any> {
    // Validar que se envió el id_reemplazo
    if (!data.id_reemplazo) {
      throw new NotFoundException('Debe especificar el id_reemplazo');
    }

    // Llamar al service para registrar el reemplazo
    return this.contratosService.asignarReemplazoAlContrato({
      id_contrato: contratoId,
      id_reemplazo: data.id_reemplazo,
      id_especialidad: data.id_especialidad,
      horas_contratadas: data.horas_contratadas,
      aceptado: data.aceptado,
    });
  }

  
 // Endpoint para notificar integrantes según el tipo_servicio del contrato
  @Post(':contratoId/notificar-por-servicio')
  async notificarPorServicio(@Param('contratoId') contratoId: string) {
    // 1. Obtener el contrato completo
    const contrato = await this.contratosService.getContrato(contratoId);

    // 2. Pasar el contrato al service de notificaciones
    const result = await this.notificacionesService.notificarIntegrantesPorServicio(contrato);

    // 3. Devolver la respuesta
    return result;
  }


  @Post(':contratoId/invitaciones/:integranteId/aceptar')
  async aceptarInvitacion(
    @Param('contratoId') contratoId: string,
    @Param('integranteId') integranteId: string,
  ) {
    return this.contratosService.aceptarInvitacion(contratoId, integranteId);
  }

  @Post(':contratoId/invitaciones/:integranteId/rechazar')
  async rechazarInvitacion(
    @Param('contratoId') contratoId: string,
    @Param('integranteId') integranteId: string,
  ) {
    return this.contratosService.rechazarInvitacion(contratoId, integranteId);
  }

  // aceptar/rechazar reemplazos

    @Post(':contratoId/invitacionesReemplazos/:reemplazoId/aceptar')
  async aceptarInvitacionReemplazo(
    @Param('contratoId') contratoId: string,
    @Param('reemplazoId') reemplazoId: string,
  ) {
    return this.contratosService.aceptarInvitacionReemplazo(contratoId, reemplazoId);
  }

   @Post(':contratoId/invitacionesReemplazos/:reemplazoId/rechazar')
  async rechazarInvitacionReemplazo(
    @Param('contratoId') contratoId: string,
    @Param('reemplazoId') reemplazoId: string,
  ) {
    return this.contratosService.rechazarInvitacionReemplazo(contratoId, reemplazoId);
  }

  //----


@Get(':contratoId/resumen')
async resumenContrato(@Param('contratoId') contratoId: string) {
  return this.contratosService.getResumenContrato(contratoId);
}



@Post(':contratoId/notificar-reemplazo/:reemplazoId')
async notificarReemplazo(
  @Param('contratoId') contratoId: string,
  @Param('reemplazoId') reemplazoId: string,
) {
  return this.notificacionesService.notificarReemplazoIndividual(contratoId, reemplazoId);
}


@Post(':id/notificar-adelanto')
async notificarAdelanto(@Param('id') id: string) {
  return this.notificacionesService.notificarAdelanto(id);
}

}