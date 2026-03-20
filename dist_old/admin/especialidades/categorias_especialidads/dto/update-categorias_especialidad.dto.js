"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoriasEspecialidadDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_categorias_especialidad_dto_1 = require("./create-categorias_especialidad.dto");
class UpdateCategoriasEspecialidadDto extends (0, swagger_1.PartialType)(create_categorias_especialidad_dto_1.CreateCategoriasEspecialidadDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCategoriasEspecialidadDto = UpdateCategoriasEspecialidadDto;
//# sourceMappingURL=update-categorias_especialidad.dto.js.map