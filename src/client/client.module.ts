import { Module } from "@nestjs/common";
import { ClientsController } from "./clients/clients.controller";
import { ClientsModule } from "./clients/clients.module";
import { ClientAuthModule } from "../auth/client-auth/client-auth.module";
import { ClientAuthController } from "../auth/client-auth/client-auth.controller";
import { ClientContratosController } from "./contracts/contracts.controller";
import { ContratosModule } from "../admin/contratos/contratos.module";
import { NotificacionesModule } from "../admin/notificaciones/notificaciones.module";
import { NotificacionesController } from "../admin/notificaciones/notificaciones.controller";
import { UsersModule } from "../admin/users/users.module";
import { PagosController } from "./pagos/pagos.controller";
import { PagoModule } from "./pagos/pago.module";
import { SolicitarRecuperacionModule } from './solicitar-recuperacion/solicitar-recuperacion.module';
import { SolicitarRecuperacionController } from "./solicitar-recuperacion/solicitar-recuperacion.controller";


@Module({
    imports: [
        ClientsModule,
        ClientAuthModule,
        ContratosModule,
        NotificacionesModule,
        UsersModule,
        PagoModule,
        SolicitarRecuperacionModule,
        
    ],
    controllers: [
        SolicitarRecuperacionController,
        NotificacionesController,
        ClientContratosController,
        ClientAuthController,
        ClientsController,
        PagosController
        

    ],
})
export class ClientModule {}
