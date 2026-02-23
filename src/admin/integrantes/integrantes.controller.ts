import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { IntegrantesService } from './integrantes.service';
import { CreateIntegranteDto } from './dto/create-integrante.dto';
import { UpdateIntegranteDto } from './dto/update-integrante.dto';
import { FiltroIntegranteDataDto } from './dto/filtro-integrante-data.dto';

@Controller('integrantes')
export class IntegrantesController {
  constructor(private readonly integrantesService: IntegrantesService) {}

  @Post()
  create(@Query() req, @Body() createIntegranteDto: CreateIntegranteDto) {
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

}
