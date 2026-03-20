"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientAuthDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const client_login_dto_1 = require("./client-login.dto");
class UpdateClientAuthDto extends (0, swagger_1.PartialType)(client_login_dto_1.ClientLoginDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateClientAuthDto = UpdateClientAuthDto;
//# sourceMappingURL=update-client-auth.dto.js.map