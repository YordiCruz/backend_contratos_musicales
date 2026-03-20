"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsePersonaDto = void 0;
const openapi = require("@nestjs/swagger");
class ResponsePersonaDto {
    id;
    nombre;
    apellido;
    documento_identidad;
    telefono;
    email;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, apellido: { required: true, type: () => String }, documento_identidad: { required: true, type: () => String }, telefono: { required: true, type: () => String }, email: { required: true, type: () => String } };
    }
}
exports.ResponsePersonaDto = ResponsePersonaDto;
//# sourceMappingURL=reponse-persona.dto.js.map