"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignarIntegrantesDto = exports.AsignarIntegranteDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AsignarIntegranteDto {
    id_integrante;
    horas_contratadas;
    aceptado;
    static _OPENAPI_METADATA_FACTORY() {
        return { id_integrante: { required: true, type: () => String, format: "uuid" }, horas_contratadas: { required: false, type: () => Number }, aceptado: { required: false, type: () => Boolean } };
    }
}
exports.AsignarIntegranteDto = AsignarIntegranteDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AsignarIntegranteDto.prototype, "id_integrante", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AsignarIntegranteDto.prototype, "horas_contratadas", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AsignarIntegranteDto.prototype, "aceptado", void 0);
const class_transformer_1 = require("class-transformer");
const class_validator_2 = require("class-validator");
class AsignarIntegrantesDto {
    integrantes;
    static _OPENAPI_METADATA_FACTORY() {
        return { integrantes: { required: true, type: () => [require("./asignar-integrante.dto").AsignarIntegranteDto] } };
    }
}
exports.AsignarIntegrantesDto = AsignarIntegrantesDto;
__decorate([
    (0, class_validator_2.IsArray)(),
    (0, class_validator_2.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AsignarIntegranteDto),
    __metadata("design:type", Array)
], AsignarIntegrantesDto.prototype, "integrantes", void 0);
//# sourceMappingURL=asignar-integrante.dto.js.map