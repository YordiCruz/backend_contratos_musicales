"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseIntegranteDto = void 0;
const openapi = require("@nestjs/swagger");
class ResponseIntegranteDto {
    tarifa_base_hora;
    moneda;
    fecha_ingreso;
    estado;
    creado_en;
    actualizado_en;
    eliminado_en;
    persona;
    registrado_por;
    static _OPENAPI_METADATA_FACTORY() {
        return { tarifa_base_hora: { required: true, type: () => Number }, moneda: { required: true, type: () => String }, fecha_ingreso: { required: true, type: () => Date }, estado: { required: true, type: () => String }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date }, eliminado_en: { required: true, type: () => Date }, persona: { required: true, type: () => require("../../personas/dto/reponse-persona.dto").ResponsePersonaDto, nullable: true }, registrado_por: { required: false, type: () => ({ id: { required: true, type: () => String }, username: { required: true, type: () => String }, persona: { required: false, type: () => require("../../personas/dto/reponse-persona.dto").ResponsePersonaDto, nullable: true } }), nullable: true } };
    }
}
exports.ResponseIntegranteDto = ResponseIntegranteDto;
//# sourceMappingURL=response-integrante.dto.js.map