import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { EspecialidadsService } from './especialidads.service';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { FiltrosEspecialidadDto } from './dto/filtros-especialidad.dto';
import { AdminJwtGuard } from '../../../auth/admin-auth/guards/admin-jwt.guard';

@UseGuards(AdminJwtGuard)
@Controller('especialidades')
export class EspecialidadsController {
  constructor(private readonly especialidadsService: EspecialidadsService) {}

  @Post()
  create(@Body() createEspecialidadDto: CreateEspecialidadDto) {
    return this.especialidadsService.create(createEspecialidadDto); 
  }

  @Get()
  findAll(
    @Query() filters: FiltrosEspecialidadDto
  ) {
    return this.especialidadsService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especialidadsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspecialidadDto: UpdateEspecialidadDto) {
    return this.especialidadsService.update(id, updateEspecialidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especialidadsService.remove(id);
  }
}
