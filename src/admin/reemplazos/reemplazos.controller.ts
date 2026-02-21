import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ReemplazosService } from './reemplazos.service';
import { CreateReemplazoDto } from './dto/create-reemplazo.dto';
import { UpdateReemplazoDto } from './dto/update-reemplazo.dto';
import { FiltrosReemplazoDto } from './dto/filtros-reemplazo.dto';

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
}
