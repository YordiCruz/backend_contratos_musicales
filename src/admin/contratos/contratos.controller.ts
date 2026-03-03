import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { ContratoIntegrante } from './entities/contrato-integrante.entity';
import { ConfirmarContratoDto } from './dto/confirmar-contrato.dto';

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
  @Patch(':id/confirmar')
  confirmar(
    @Param('id') id: string,
    @Body() integrantesData: ConfirmarContratoDto[],
  ) {
    return this.contratosService.confirmarContrato(id, integrantesData);
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
}