import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { AdminJwtGuard } from '../../../auth/admin-auth/guards/admin-jwt.guard';

@UseGuards(AdminJwtGuard)
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto, @Req() req) {
    return this.categoriasService.create(createCategoriaDto, req.user);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(id);
  }

  @Patch(':id')
update(
  @Param('id') id: string,
  @Body() body: any,
  @Req() req
) {
  return this.categoriasService.update(id, body, req.user);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.removes(id);
  }
}
