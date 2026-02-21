import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReemplazosService } from './reemplazos.service';
import { CreateReemplazoDto } from './dto/create-reemplazo.dto';
import { UpdateReemplazoDto } from './dto/update-reemplazo.dto';

@Controller('reemplazos')
export class ReemplazosController {
  constructor(private readonly reemplazosService: ReemplazosService) {}

  @Post()
  create(@Body() createReemplazoDto: CreateReemplazoDto) {
    return this.reemplazosService.create(createReemplazoDto);
  }

  @Get()
  findAll() {
    return this.reemplazosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reemplazosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReemplazoDto: UpdateReemplazoDto) {
    return this.reemplazosService.update(+id, updateReemplazoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reemplazosService.remove(+id);
  }
}
