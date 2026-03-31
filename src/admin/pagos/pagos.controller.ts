import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { PagosService } from "./pagos.service";

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  registrar(@Body() body, @Req() req) {
    return this.pagosService.registrarPago(body);
  }

  @Get(':contratoId')
  listar(@Param('contratoId') contratoId: string) {
    return this.pagosService.listarPagos(contratoId);
  }

  @Get()
findAll() {
  return this.pagosService.listarTodosPagos();
}


@Get('contrato/:id/resumen')
async resumen(@Param('id') id: string) {
  return this.pagosService.obtenerResumenContrato(id);
}



  @Get('confirmar/:transaccionId')
  async confirmar(@Param('transaccionId') transaccionId: string) {
    return this.pagosService.confirmarPagoSimulado(transaccionId);
  }

}