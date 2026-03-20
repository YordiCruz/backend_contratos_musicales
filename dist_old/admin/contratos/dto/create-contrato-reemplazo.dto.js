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
exports.CreateContratoReemplazoDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateContratoReemplazoDto {
    id_contrato;
    id_reemplazo;
    rol;
    compensacion_hora;
    horas_contratadas;
    static _OPENAPI_METADATA_FACTORY() {
        return { id_contrato: { required: true, type: () => String, format: "uuid" }, id_reemplazo: { required: true, type: () => String, format: "uuid" }, rol: { required: true, type: () => String }, compensacion_hora: { required: true, type: () => Number }, horas_contratadas: { required: true, type: () => Number } };
    }
}
exports.CreateContratoReemplazoDto = CreateContratoReemplazoDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateContratoReemplazoDto.prototype, "id_contrato", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateContratoReemplazoDto.prototype, "id_reemplazo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContratoReemplazoDto.prototype, "rol", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateContratoReemplazoDto.prototype, "compensacion_hora", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateContratoReemplazoDto.prototype, "horas_contratadas", void 0);
//# sourceMappingURL=create-contrato-reemplazo.dto.js.map