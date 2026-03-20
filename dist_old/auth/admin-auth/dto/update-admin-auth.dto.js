"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminAuthDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const admin_login_dto_1 = require("./admin-login.dto");
class UpdateAdminAuthDto extends (0, swagger_1.PartialType)(admin_login_dto_1.AdminLoginDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateAdminAuthDto = UpdateAdminAuthDto;
//# sourceMappingURL=update-admin-auth.dto.js.map