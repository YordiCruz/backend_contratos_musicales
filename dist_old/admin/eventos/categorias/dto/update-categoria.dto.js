"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoriaDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_categoria_dto_1 = require("./create-categoria.dto");
class UpdateCategoriaDto extends (0, swagger_1.PartialType)(create_categoria_dto_1.CreateCategoriaDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCategoriaDto = UpdateCategoriaDto;
//# sourceMappingURL=update-categoria.dto.js.map