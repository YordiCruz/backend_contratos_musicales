"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_client_data_dto_1 = require("./create-client-data.dto");
class UpdateClientDto extends (0, swagger_1.OmitType)(create_client_data_dto_1.CreateClientDataDto, ['tipo_cliente', 'origen_registro', 'saldo_pendiente', 'limite_credito']) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateClientDto = UpdateClientDto;
//# sourceMappingURL=update-client.dto.js.map