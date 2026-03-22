import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  // ============================
  // CREAR EVENTO (solo datos)
  // ============================
  @Post()
  create(@Body() dto: CreateEventoDto) {
    return this.eventosService.create(dto);
  }



  @Patch(':id_evento/estado')
changeEstado(
  @Param('id_evento') id_evento: string,
  @Body('estado') estado: string
) {
  return this.eventosService.changeEstado(id_evento, estado);
}

  // ============================
  // LISTAR EVENTOS
  // ============================
  @Get()
  findAll() {
    return this.eventosService.findAll();
  }

  // ============================
  // OBTENER EVENTO
  // ============================
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventosService.findOne(id);
  }

  // ============================
  // EDITAR EVENTO (solo datos)
  // ============================
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEventoDto) {
    dto.precio_base = Number(dto.precio_base);
    return this.eventosService.update(id, dto);
  }

  // ============================
  // ELIMINAR EVENTO
  // ============================
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventosService.remove(id);
  }
}