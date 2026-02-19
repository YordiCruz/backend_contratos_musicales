import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { PersonasService } from './personas.service';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { FiltrosPersonaDto } from './dto/filtros-persona.dto';

@Controller('personas')
export class PersonasController {
    constructor(
        private readonly personasService: PersonasService
    ){}


    @Post()
    create(@Body() createPersonaDto: CreatePersonaDto) {
      return this.personasService.create(createPersonaDto);
    }

   @Get()
     findAll(@Query() filters: FiltrosPersonaDto) {
       return this.personasService.findAll(filters);
     }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonaDto: UpdatePersonaDto
  ) {
    return this.personasService.update(id, updatePersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personasService.remove(id);
  }





}
