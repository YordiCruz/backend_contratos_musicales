import { Module } from "@nestjs/common";
import { ClientsController } from "./clients/clients.controller";
import { ClientsModule } from "./clients/clients.module";
import { ClientAuthModule } from "src/auth/client-auth/client-auth.module";
import { ClientAuthController } from "src/auth/client-auth/client-auth.controller";


@Module({
    imports: [
        ClientsModule,
        ClientAuthModule
    ],
    controllers: [
        ClientAuthController,
        ClientsController
    ],
})
export class ClientModule {}
