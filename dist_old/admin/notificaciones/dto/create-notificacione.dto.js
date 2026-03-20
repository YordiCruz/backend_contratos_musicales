"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNotificacioneDto = exports.TipoNotificacion = void 0;
const openapi = require("@nestjs/swagger");
var TipoNotificacion;
(function (TipoNotificacion) {
    TipoNotificacion["INTEGRANTE"] = "INTEGRANTE";
    TipoNotificacion["REEMPLAZO"] = "REEMPLAZO";
    TipoNotificacion["CLIENTE"] = "CLIENTE";
    TipoNotificacion["ADMIN"] = "ADMIN";
    TipoNotificacion["ADMIN_RESUMEN"] = "ADMIN_RESUMEN";
})(TipoNotificacion || (exports.TipoNotificacion = TipoNotificacion = {}));
class CreateNotificacioneDto {
    tipo;
    destinatarioId;
    contratoId;
    mensaje;
    fecha;
    static _OPENAPI_METADATA_FACTORY() {
        return { tipo: { required: true, enum: require("./create-notificacione.dto").TipoNotificacion }, destinatarioId: { required: true, type: () => String }, contratoId: { required: true, type: () => String }, mensaje: { required: true, type: () => String }, fecha: { required: true, type: () => Date } };
    }
}
exports.CreateNotificacioneDto = CreateNotificacioneDto;
//# sourceMappingURL=create-notificacione.dto.js.map