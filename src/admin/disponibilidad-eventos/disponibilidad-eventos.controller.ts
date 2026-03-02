import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DisponibilidadEventosService } from './disponibilidad-eventos.service';
import { CreateDisponibilidadEventoDto } from './dto/create-disponibilidad-evento.dto';
import { UpdateDisponibilidadEventoDto } from './dto/update-disponibilidad-evento.dto';

@Controller('disponibilidad-eventos')
export class DisponibilidadEventosController {
  constructor(private readonly disponibilidadEventosService: DisponibilidadEventosService) {}

  @Post()
  create(@Body() createDisponibilidadEventoDto: CreateDisponibilidadEventoDto) {
    return this.disponibilidadEventosService.create(createDisponibilidadEventoDto);
  }

  @Get()
  findAll() {
    return this.disponibilidadEventosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disponibilidadEventosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDisponibilidadEventoDto: UpdateDisponibilidadEventoDto) {
    return this.disponibilidadEventosService.update(+id, updateDisponibilidadEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disponibilidadEventosService.remove(+id);
  }
}
