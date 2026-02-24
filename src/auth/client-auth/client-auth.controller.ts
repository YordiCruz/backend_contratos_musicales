import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientAuthService } from './client-auth.service';
import { CreateClientAuthDto } from './dto/create-client-auth.dto';
import { UpdateClientAuthDto } from './dto/update-client-auth.dto';

@Controller('client-auth')
export class ClientAuthController {
  constructor(private readonly clientAuthService: ClientAuthService) {}

  @Post()
  create(@Body() createClientAuthDto: CreateClientAuthDto) {
    return this.clientAuthService.create(createClientAuthDto);
  }

  @Get()
  findAll() {
    return this.clientAuthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientAuthService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientAuthDto: UpdateClientAuthDto) {
    return this.clientAuthService.update(+id, updateClientAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientAuthService.remove(+id);
  }
}
