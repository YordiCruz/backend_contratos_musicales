import { Module } from "@nestjs/common";
import { ClientsController } from "./clients/clients.controller";
import { ClientsService } from "./clients/clients.service";
import { ClientsModule } from "./clients/clients.module";


@Module({
    imports: [
        ClientsModule
    ],
    controllers: [ClientsController],
})
export class ClientModule {}
