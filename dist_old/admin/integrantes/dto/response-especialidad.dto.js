"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseEspecialidadDto = void 0;
const openapi = require("@nestjs/swagger");
class ResponseEspecialidadDto {
    id;
    nombre;
    descripcion;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String } };
    }
}
exports.ResponseEspecialidadDto = ResponseEspecialidadDto;
//# sourceMappingURL=response-especialidad.dto.js.map