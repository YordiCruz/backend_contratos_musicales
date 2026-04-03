import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { DatosEmpresaService } from './datos-empresa.service';
import { CreateDatosEmpresaDto } from './dto/create-datos-empresa.dto';
import { UpdateDatosEmpresaDto } from './dto/update-datos-empresa.dto';
import { AdminJwtGuard } from 'src/auth/admin-auth/guards/admin-jwt.guard';

@UseGuards(AdminJwtGuard)
@Controller('datos-empresa')
export class DatosEmpresaController {
  constructor(private readonly datosService: DatosEmpresaService) {}

  @Post()
  crear(@Body() dto: CreateDatosEmpresaDto) {
    return this.datosService.crear(dto);
  }

  @Get()
  obtenerTodos() {
    return this.datosService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.datosService.obtenerPorId(id);
  }

 @Put(':id')
actualizar(
  @Param('id') id: string,
  @Body() dto: UpdateDatosEmpresaDto
) {
  return this.datosService.actualizar(id, dto);
}

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.datosService.eliminar(id);
  }

  @Get('ubicacion/base')
  obtenerUbicacionBase() {
    return this.datosService.obtenerUbicacionBase();
  }
}
