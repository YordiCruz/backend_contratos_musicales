"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUpdateReemplazoDto = void 0;
const openapi = require("@nestjs/swagger");
class ResponseUpdateReemplazoDto {
    id;
    tarifa_base_hora;
    moneda;
    estado;
    disponible;
    creado_en;
    actualizado_en;
    eliminado_en;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, tarifa_base_hora: { required: true, type: () => Number }, moneda: { required: true, type: () => String }, estado: { required: true, type: () => String }, disponible: { required: true, type: () => Boolean }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date }, eliminado_en: { required: true, type: () => Date } };
    }
}
exports.ResponseUpdateReemplazoDto = ResponseUpdateReemplazoDto;
//# sourceMappingURL=response-update-reemplazo.dto.js.map