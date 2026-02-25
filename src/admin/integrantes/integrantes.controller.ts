import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { IntegrantesService } from './integrantes.service';
import { CreateIntegranteDto } from './dto/create-integrante.dto';
import { UpdateIntegranteDto } from './dto/update-integrante.dto';
import { FiltroIntegranteDataDto } from './dto/filtro-integrante-data.dto';
import { AsignarEspecialidadDto } from './dto/asignar-especialidad.dto';
import { AsignarVariasEspecialidadesDto } from './dto/asignar-varias-especialidades.dto';
import { AdminJwtGuard } from 'src/auth/admin-auth/guards/admin-jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AdminJwtGuard)
@Controller('integrantes')
export class IntegrantesController {
  constructor(private readonly integrantesService: IntegrantesService) {}

  @Post()
  create(@Req() req, @Body() createIntegranteDto: CreateIntegranteDto) {
    return this.integrantesService.create(createIntegranteDto, req.user);
  }

  @Get()
  findAll( @Query() filters: FiltroIntegranteDataDto) {
    return this.integrantesService.findAll( filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.integrantesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntegranteDto: UpdateIntegranteDto) {
    return this.integrantesService.update(id, updateIntegranteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.integrantesService.remove(id);
  }


  @Post('integrantes/from-persona/:idPersona')
  createIntegranteFromExistingPersona(@Param('idPersona') idPersona: string,@Param() req , @Body() dto: any) {
    return this.integrantesService.createIntegranteFromExistingPersona(idPersona, dto, req.user);
  }

  @Get(':id/especialidades')
  listEspecialidades(@Param('id') id: string) {
    return this.integrantesService.listaEspecialidades(id);
  }

  @Post(':id/especialidades')
  asignarEspecialidad(
    @Param('id') id: string,
    @Body() dto: AsignarEspecialidadDto,
  ) {
    return this.integrantesService.asignarEspecialidad(id, dto);
  }

  @Post(':id/especialidades/multiples')
  asignarMultiples(
    @Param('id') id: string,
    @Body() dto: AsignarVariasEspecialidadesDto,
  ) {
    return this.integrantesService.asignarMultiplesEspecialidades(id, dto);
  }

  @Delete(':id/especialidades/:idEspecialidad')
  eliminarEspecialidad(
    @Param('id') id: string,
    @Param('idEspecialidad') idEspecialidad: string,
  ) {
    return this.integrantesService.eliminarEspecialidad(id, idEspecialidad);
  }




}
