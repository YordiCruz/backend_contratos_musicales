import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { FiltroClientDto } from './dto/filtro-client.dto';
import { ClientJwtGuard } from 'src/auth/client-auth/guards/client-jwt.guard';

@UseGuards(ClientJwtGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Req() req, @Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto, req.user);
  }

  @Get()
  findAll(@Query() filters: FiltroClientDto) {
    return this.clientsService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  
  }

  @Post('/persona/:idPersona')
  createClientFromExistingPersona(@Query() req , @Param('idPersona') idPersona: string, @Body() dto: any) {
    return this.clientsService.createClientFromExistingPersona(idPersona, dto, req.user);
  }


}
