import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { Ubicacion } from './entities/ubicacion.entity';

@Controller('ubicaciones')
export class UbicacionController {
  constructor(private readonly ubicacionesService: UbicacionService) {}

  @Post()
  create(@Body() data: Partial<Ubicacion>) {
    return this.ubicacionesService.create(data);
  }

  @Get()
  findAll() {
    return this.ubicacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ubicacionesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Ubicacion>) {
    return this.ubicacionesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ubicacionesService.remove(id);
  }
}