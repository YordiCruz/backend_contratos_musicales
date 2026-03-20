"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCategoriaDto = void 0;
const openapi = require("@nestjs/swagger");
class ResponseCategoriaDto {
    nombre;
    descripcion;
    estado;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, descripcion: { required: false, type: () => String }, estado: { required: true, type: () => String } };
    }
}
exports.ResponseCategoriaDto = ResponseCategoriaDto;
//# sourceMappingURL=response-categoria.dto.js.map