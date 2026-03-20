"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePersonaDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_persona_dto_1 = require("./create-persona.dto");
class UpdatePersonaDto extends (0, swagger_1.PartialType)(create_persona_dto_1.CreatePersonaDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePersonaDto = UpdatePersonaDto;
//# sourceMappingURL=update-persona.dto.js.map