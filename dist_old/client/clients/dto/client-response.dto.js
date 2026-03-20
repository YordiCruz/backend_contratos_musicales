"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class ClientResponseDto {
    id;
    tipo_cliente;
    origen_registro;
    categoria;
    saldo_pendiente;
    limite_credito;
    descuentos;
    contacto_secundario;
    preferencia_contacto;
    estado;
    creado_en;
    actualizado_en;
    persona;
    registrado_por;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, tipo_cliente: { required: true, type: () => String }, origen_registro: { required: true, type: () => String }, categoria: { required: true, type: () => String }, saldo_pendiente: { required: true, type: () => Number }, limite_credito: { required: true, type: () => Number }, descuentos: { required: true, type: () => Number }, contacto_secundario: { required: true, type: () => String }, preferencia_contacto: { required: true, type: () => String }, estado: { required: true, type: () => String }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date }, persona: { required: true, type: () => require("../../../admin/personas/dto/reponse-persona.dto").ResponsePersonaDto, nullable: true }, registrado_por: { required: false, type: () => ({ id: { required: true, type: () => String }, username: { required: true, type: () => String }, persona: { required: false, type: () => require("../../../admin/personas/dto/reponse-persona.dto").ResponsePersonaDto, nullable: true } }), nullable: true } };
    }
}
exports.ClientResponseDto = ClientResponseDto;
//# sourceMappingURL=client-response.dto.js.map