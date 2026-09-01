import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { PagosService } from "./pagos.service";
import { ClientJwtGuard } from "../../auth/client-auth/guards/client-jwt.guard";
import { AdminJwtGuard } from "../../auth/admin-auth/guards/admin-jwt.guard";

@UseGuards(AdminJwtGuard)
@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}


 @Post('/registrar2')
registrarPago2(@Body() dto: any) {
  return this.pagosService.registrarPago2(dto);
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


  @Post(':id/solicitar-adelanto')
  async solicitarAdelanto(@Param('id') id: string, @Body() body) {
    return this.pagosService.solicitarAdelanto(id, body);
  }


@Patch(':id/confirmar')
confirmarPago(@Param('id') id: string) {
  return this.pagosService.confirmarPago2(id);
}

}