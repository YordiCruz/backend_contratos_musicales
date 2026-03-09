import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common';
import { PagosService } from './pagos.service';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  registrar(@Body() body, @Req() req) {
    return this.pagosService.registrarPago({
      contratoId: body.contratoId,
      monto: body.monto,
      metodo: body.metodo,
      tipo: body.tipo,
      referencia: body.referencia,
      registrado_por: req.user, // usuario logueado
    });
  }

  @Get(':contratoId')
  listar(@Param('contratoId') contratoId: string) {
    return this.pagosService.listarPagos(contratoId);
  }
}