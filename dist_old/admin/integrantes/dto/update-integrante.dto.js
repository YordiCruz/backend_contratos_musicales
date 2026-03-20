"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIntegranteDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_integrante_data_dto_1 = require("./create-integrante-data.dto");
class UpdateIntegranteDto extends (0, swagger_1.PartialType)(create_integrante_data_dto_1.CreateIntegranteDataDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateIntegranteDto = UpdateIntegranteDto;
//# sourceMappingURL=update-integrante.dto.js.map