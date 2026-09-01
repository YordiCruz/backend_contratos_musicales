import { Module } from "@nestjs/common";
import { PagosController } from "./pagos.controller";
import { Pago } from "../../admin/pagos/entities/pago.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PagoService } from "./pago.service";
import { Contrato } from "../../admin/contratos/entities/contrato.entity";
import { User } from "../../admin/users/entities/user.entity";
import { NotificacionesModule } from "../../admin/notificaciones/notificaciones.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Pago, Contrato, User]),
        NotificacionesModule,
    ],
    controllers: [PagosController],
    providers: [PagoService],
    exports: [PagoService]
})
export class PagoModule {}
