"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordDto = void 0;
const openapi = require("@nestjs/swagger");
class UpdatePasswordDto {
    oldpassword;
    newpassword;
    static _OPENAPI_METADATA_FACTORY() {
        return { oldpassword: { required: false, type: () => String }, newpassword: { required: true, type: () => String } };
    }
}
exports.UpdatePasswordDto = UpdatePasswordDto;
//# sourceMappingURL=update-password.dto.js.map