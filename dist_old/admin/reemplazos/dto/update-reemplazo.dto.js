"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReemplazoDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_reemplazo_data_dto_1 = require("./create-reemplazo-data.dto");
class UpdateReemplazoDto extends (0, swagger_1.PartialType)(create_reemplazo_data_dto_1.CreateReemplazoDataDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateReemplazoDto = UpdateReemplazoDto;
//# sourceMappingURL=update-reemplazo.dto.js.map