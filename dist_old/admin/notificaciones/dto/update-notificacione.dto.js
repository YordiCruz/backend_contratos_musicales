"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNotificacioneDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_notificacione_dto_1 = require("./create-notificacione.dto");
class UpdateNotificacioneDto extends (0, swagger_1.PartialType)(create_notificacione_dto_1.CreateNotificacioneDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateNotificacioneDto = UpdateNotificacioneDto;
//# sourceMappingURL=update-notificacione.dto.js.map