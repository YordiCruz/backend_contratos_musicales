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
exports.ConfirmarContratoDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ConfirmarContratoDto {
    id_integrante;
    id_especialidad;
    horas_contratadas;
    static _OPENAPI_METADATA_FACTORY() {
        return { id_integrante: { required: true, type: () => String, format: "uuid" }, id_especialidad: { required: true, type: () => String, format: "uuid" }, horas_contratadas: { required: true, type: () => Number } };
    }
}
exports.ConfirmarContratoDto = ConfirmarContratoDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ConfirmarContratoDto.prototype, "id_integrante", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ConfirmarContratoDto.prototype, "id_especialidad", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ConfirmarContratoDto.prototype, "horas_contratadas", void 0);
//# sourceMappingURL=confirmar-contrato.dto.js.map