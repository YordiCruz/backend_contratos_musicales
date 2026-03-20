"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmailDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_email_dto_1 = require("./create-email.dto");
class UpdateEmailDto extends (0, swagger_1.PartialType)(create_email_dto_1.CreateEmailDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateEmailDto = UpdateEmailDto;
//# sourceMappingURL=update-email.dto.js.map