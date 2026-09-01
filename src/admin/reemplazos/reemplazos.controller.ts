import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ReemplazosService } from './reemplazos.service';
import { CreateReemplazoDto } from './dto/create-reemplazo.dto';
import { UpdateReemplazoDto } from './dto/update-reemplazo.dto';
import { FiltrosReemplazoDto } from './dto/filtros-reemplazo.dto';
import { AsignarEspecialidadDto } from './dto/asignar-especialidad.dto';
import { AsignarVariasEspecialidadesDto } from './dto/asignar-varias-especialidades.dto';
import { AdminJwtGuard } from '../../auth/admin-auth/guards/admin-jwt.guard';

@UseGuards(AdminJwtGuard)
@Controller('reemplazos')
export class ReemplazosController {
  constructor(private readonly reemplazosService: ReemplazosService) {}

  @Post()
  create(@Req() req, @Body() createReemplazoDto: CreateReemplazoDto) {
    return this.reemplazosService.create(createReemplazoDto, req.user);
  }

  @Get()
  findAll(@Param() filters: FiltrosReemplazoDto) {
    return this.reemplazosService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reemplazosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReemplazoDto: UpdateReemplazoDto) {
    return this.reemplazosService.update(id, updateReemplazoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reemplazosService.remove(id);
  }
  @Post('reemplazos/from-persona/:idPersona')
  createReemplazFromExistingPersona(@Param('idPersona') idPersona: string,@Param() req , @Body() dto: any) {
    return this.reemplazosService.createReemplazoFromExistingPersona(idPersona, dto, req.user);
  }

  
    @Get(':id/especialidades')
    listEspecialidades(@Param('id') id: string) {
      return this.reemplazosService.listaEspecialidades(id);
    }
  
    @Post(':id/especialidades')
    asignarEspecialidad(
      @Param('id') id: string,
      @Body() dto: AsignarEspecialidadDto,
    ) {
      return this.reemplazosService.asignarEspecialidad(id, dto);
    }
  
    @Post(':id/especialidades/multiples')
    asignarMultiples(
      @Param('id') id: string,
      @Body() dto: AsignarVariasEspecialidadesDto,
    ) {
      return this.reemplazosService.asignarMultiplesEspecialidades(id, dto);
    }
  
    @Delete(':id/especialidades/:idEspecialidad')
    eliminarEspecialidad(
      @Param('id') id: string,
      @Param('idEspecialidad') idEspecialidad: string,
    ) {
      return this.reemplazosService.eliminarEspecialidad(id, idEspecialidad);
    }

}
