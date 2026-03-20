"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContratoDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_contrato_dto_1 = require("./create-contrato.dto");
class UpdateContratoDto extends (0, swagger_1.PartialType)(create_contrato_dto_1.CreateContratoDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateContratoDto = UpdateContratoDto;
//# sourceMappingURL=update-contrato.dto.js.map