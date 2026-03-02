import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { DisponibilidadEventosService } from './disponibilidad-eventos.service';

@Controller('disponibilidad')
export class DisponibilidadEventosController {
  constructor(private readonly disponibilidadService: DisponibilidadEventosService) {}

  // Consultar disponibilidad por mes (ej: calendario)
  @Get(':año/:mes')
  async getDisponibilidadPorMes(
    @Param('año') año: number,
    @Param('mes') mes: number,
  ) {
    return this.disponibilidadService.getDisponibilidadPorMes(año, mes);
  }

  // Consultar disponibilidad por día específico
  @Get('dia/:fecha')
  async getDisponibilidadPorDia(@Param('fecha') fecha: string) {
    return this.disponibilidadService.getDisponibilidadPorDia(new Date(fecha));
  }

  // Marcar slot como ocupado (cuando se confirma un contrato)
  @Post('ocupar')
  async ocupar(
    @Body() data: { fecha: string; bloque: string; contratoId: string },
  ) {
    return this.disponibilidadService.marcarOcupado(
      new Date(data.fecha),
      data.bloque,
      data.contratoId,
    );
  }

  // Marcar slot como libre (cuando se cancela un contrato)
  @Post('liberar')
  async liberar(@Body() data: { fecha: string; bloque: string }) {
    return this.disponibilidadService.marcarLibre(
      new Date(data.fecha),
      data.bloque,
    );
  }
}