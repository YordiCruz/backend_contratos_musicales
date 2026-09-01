import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolicitarRecuperacionService } from './solicitar-recuperacion.service';
import { CreateSolicitarRecuperacionDto } from './dto/create-solicitar-recuperacion.dto';
import { UpdateSolicitarRecuperacionDto } from './dto/update-solicitar-recuperacion.dto';

@Controller('solicitar-recuperacion')
export class SolicitarRecuperacionController {
  constructor(private readonly solicitarRecuperacionService: SolicitarRecuperacionService
    
  ) {}

  @Post()
  create(@Body() createSolicitarRecuperacionDto: CreateSolicitarRecuperacionDto) {
    return this.solicitarRecuperacionService.create(createSolicitarRecuperacionDto);
  }

  @Get()
  findAll() {
    return this.solicitarRecuperacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitarRecuperacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitarRecuperacionDto: UpdateSolicitarRecuperacionDto) {
    return this.solicitarRecuperacionService.update(+id, updateSolicitarRecuperacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitarRecuperacionService.remove(+id);
  }

  @Post('recuperar-password')
async recuperarPassword(
 @Body() body:{correo:string}
){

 return this.solicitarRecuperacionService
 .solicitarRecuperacion(body.correo);

}





}
