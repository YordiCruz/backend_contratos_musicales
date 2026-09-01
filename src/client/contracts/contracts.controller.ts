import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';

import { ContratosService }
from '../../admin/contratos/contratos.service';
import { ClientJwtGuard } from '../../auth/client-auth/guards/client-jwt.guard';
import { ConfirmContratoDto } from '../../admin/contratos/dto/confirm-contrato.dto';


@Controller('contratos')
@UseGuards(ClientJwtGuard)
export class ClientContratosController {

  constructor(
    private readonly contratosService: ContratosService
  ) {}

 @Get('mis-reservas')
misReservas(@Req() req) {

   console.log('USER JWT:', req.user);

  return this.contratosService
    .misReservas(req.user.id);
}


@Post('respuesta-cliente')
async respuestaCliente(@Body() dto: ConfirmContratoDto) {
  return this.contratosService.respuestaClienteContrato(dto);
}


}
