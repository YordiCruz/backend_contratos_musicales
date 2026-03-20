"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseReemplazoDto = void 0;
const openapi = require("@nestjs/swagger");
class ResponseReemplazoDto {
    id;
    tarifa_base_hora;
    moneda;
    estado;
    disponible;
    creado_en;
    actualizado_en;
    eliminado_en;
    persona;
    registrado_por;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, tarifa_base_hora: { required: true, type: () => Number }, moneda: { required: true, type: () => String }, estado: { required: true, type: () => String }, disponible: { required: true, type: () => Boolean }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date }, eliminado_en: { required: true, type: () => Date }, persona: { required: true, type: () => require("../../personas/dto/reponse-persona.dto").ResponsePersonaDto, nullable: true }, registrado_por: { required: false, type: () => ({ id: { required: true, type: () => String }, username: { required: true, type: () => String }, persona: { required: false, type: () => require("../../personas/dto/reponse-persona.dto").ResponsePersonaDto, nullable: true } }) } };
    }
}
exports.ResponseReemplazoDto = ResponseReemplazoDto;
//# sourceMappingURL=response-reemplazo.dto.js.map