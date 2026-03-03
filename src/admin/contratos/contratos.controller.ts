import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { ContratoIntegrante } from './entities/contrato-integrante.entity';
import { ConfirmarContratoDto } from './dto/confirmar-contrato.dto';
import { ContratoReemplazo } from './entities/contrato-reemplazo.entity';
import { Contrato } from './entities/contrato.entity';
import { AsignarIntegrantesDto } from './dto/asignar-integrante.dto';

@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

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

  



}