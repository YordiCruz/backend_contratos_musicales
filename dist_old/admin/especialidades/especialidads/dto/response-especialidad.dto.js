"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseEspecialidadDto = exports.CategoriaResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class CategoriaResponseDto {
    id;
    nombre;
    icono;
    estado;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, icono: { required: false, type: () => String }, estado: { required: true, type: () => String } };
    }
}
exports.CategoriaResponseDto = CategoriaResponseDto;
class ResponseEspecialidadDto {
    id;
    nombre;
    descripcion;
    estado;
    categoria;
    creado_en;
    actualizado_en;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: false, type: () => String }, estado: { required: true, type: () => String }, categoria: { required: true, type: () => require("./response-especialidad.dto").CategoriaResponseDto, nullable: true }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date } };
    }
}
exports.ResponseEspecialidadDto = ResponseEspecialidadDto;
//# sourceMappingURL=response-especialidad.dto.js.map