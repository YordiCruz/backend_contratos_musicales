import { Controller, Get } from '@nestjs/common';
import { CategoriasEspecialidadsService } from './categorias_especialidads.service';

@Controller('categorias-especialidads')
export class CategoriasEspecialidadsController {
  constructor(private readonly categoriasEspecialidadsService: CategoriasEspecialidadsService) {}

  // @Post()
  // create(@Body() createCategoriasEspecialidadDto: CreateCategoriasEspecialidadDto) {
  //   return this.categoriasEspecialidadsService.create(createCategoriasEspecialidadDto);
  // }

  @Get()
  findAll() {
    return this.categoriasEspecialidadsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoriasEspecialidadsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoriasEspecialidadDto: UpdateCategoriasEspecialidadDto) {
  //   return this.categoriasEspecialidadsService.update(+id, updateCategoriasEspecialidadDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoriasEspecialidadsService.remove(+id);
  // }
}
