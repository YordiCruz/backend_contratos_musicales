"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventoDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_evento_dto_1 = require("./create-evento.dto");
class UpdateEventoDto extends (0, swagger_1.PartialType)(create_evento_dto_1.CreateEventoDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateEventoDto = UpdateEventoDto;
//# sourceMappingURL=update-evento.dto.js.map