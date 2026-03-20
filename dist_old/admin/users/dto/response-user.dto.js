"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUserDto = void 0;
const openapi = require("@nestjs/swagger");
class ResponseUserDto {
    id;
    email;
    ultimo_login;
    estado;
    origen_registro;
    persona;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, email: { required: true, type: () => String }, ultimo_login: { required: true, type: () => Date }, estado: { required: true, type: () => String }, origen_registro: { required: true, type: () => String }, persona: { required: true, type: () => require("../../personas/dto/reponse-persona.dto").ResponsePersonaDto, nullable: true } };
    }
}
exports.ResponseUserDto = ResponseUserDto;
//# sourceMappingURL=response-user.dto.js.map