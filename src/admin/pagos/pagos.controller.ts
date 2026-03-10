import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { PagosService } from "./pagos.service";

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
      proveedor: body.proveedor,
      transaccion_id: body.transaccion_id,
      payload: body.payload,
      registrado_por: req.user,
    });
  }

  @Get(':contratoId')
  listar(@Param('contratoId') contratoId: string) {
    return this.pagosService.listarPagos(contratoId);
  }



  @Get('confirmar/:transaccionId')
  async confirmar(@Param('transaccionId') transaccionId: string) {
    return this.pagosService.confirmarPagoSimulado(transaccionId);
  }

}