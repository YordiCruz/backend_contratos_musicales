"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class UpdateResponseDto {
    id;
    categoria;
    preferencia_contacto;
    estado;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, categoria: { required: true, type: () => String }, preferencia_contacto: { required: true, type: () => String }, estado: { required: true, type: () => String } };
    }
}
exports.UpdateResponseDto = UpdateResponseDto;
//# sourceMappingURL=update-response.dto.js.map