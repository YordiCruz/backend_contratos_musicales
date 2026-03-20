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
exports.CreateContratoDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateContratoDto {
    id_cliente;
    id_evento;
    id_ubicacion;
    fecha_evento;
    bloque;
    hora_inicio;
    hora_fin;
    tipo_servicio;
    horas_contratadas;
    adelanto;
    saldo;
    fecha_adelanto;
    static _OPENAPI_METADATA_FACTORY() {
        return { id_cliente: { required: true, type: () => String, format: "uuid" }, id_evento: { required: true, type: () => String, format: "uuid" }, id_ubicacion: { required: true, type: () => String, format: "uuid" }, fecha_evento: { required: true, type: () => Date }, bloque: { required: true, type: () => String }, hora_inicio: { required: false, type: () => String }, hora_fin: { required: false, type: () => String }, tipo_servicio: { required: false, type: () => String }, horas_contratadas: { required: false, type: () => Number }, adelanto: { required: false, type: () => Number }, saldo: { required: false, type: () => Number }, fecha_adelanto: { required: false, type: () => Date } };
    }
}
exports.CreateContratoDto = CreateContratoDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateContratoDto.prototype, "id_cliente", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateContratoDto.prototype, "id_evento", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateContratoDto.prototype, "id_ubicacion", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateContratoDto.prototype, "fecha_evento", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContratoDto.prototype, "bloque", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContratoDto.prototype, "hora_inicio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContratoDto.prototype, "hora_fin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContratoDto.prototype, "tipo_servicio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateContratoDto.prototype, "horas_contratadas", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateContratoDto.prototype, "adelanto", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateContratoDto.prototype, "saldo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateContratoDto.prototype, "fecha_adelanto", void 0);
//# sourceMappingURL=create-contrato.dto.js.map