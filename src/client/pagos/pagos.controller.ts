import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PagoService } from "./pago.service";
import { ClientJwtGuard } from "../../auth/client-auth/guards/client-jwt.guard";

@Controller('pagos')
@UseGuards(ClientJwtGuard)
export class PagosController {

    constructor(
        private readonly pagoService: PagoService
    ) {}

@Post('/registrar')
registrarPago(@Body() dto: any) {
  return this.pagoService.registrarPago(dto);
}



@Get('/:id')
obtenerPagos(@Param('id') id: string) {
  return this.pagoService.listarPagos(id);

}

}