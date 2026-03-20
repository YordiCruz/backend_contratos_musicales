"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
class ResponseUpdateDto {
    id;
    tarifa_base_hora;
    moneda;
    fecha_ingreso;
    estado;
    creado_en;
    actualizado_en;
    eliminado_en;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, tarifa_base_hora: { required: true, type: () => Number }, moneda: { required: true, type: () => String }, fecha_ingreso: { required: true, type: () => Date }, estado: { required: true, type: () => String }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date }, eliminado_en: { required: true, type: () => Date } };
    }
}
exports.ResponseUpdateDto = ResponseUpdateDto;
//# sourceMappingURL=response-update.dto.js.map