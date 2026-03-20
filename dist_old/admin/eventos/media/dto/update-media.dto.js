"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMediaDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_media_dto_1 = require("./create-media.dto");
class UpdateMediaDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_media_dto_1.CreateMediaDto, ['url', 'tipo'])) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateMediaDto = UpdateMediaDto;
//# sourceMappingURL=update-media.dto.js.map