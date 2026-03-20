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
exports.CreateClientDataDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateClientDataDto {
    tipo_cliente;
    origen_registro;
    categoria;
    preferencia_contacto;
    estado;
    static _OPENAPI_METADATA_FACTORY() {
        return { tipo_cliente: { required: true, type: () => String, enum: ['individual', 'empresa'] }, origen_registro: { required: true, type: () => String, enum: ['web', 'admin', 'bot'] }, categoria: { required: true, type: () => String, enum: ['normal', 'vip', 'frecuente'] }, preferencia_contacto: { required: false, type: () => String, enum: ['whatsapp', 'email'] }, estado: { required: false, type: () => String, enum: ['activo', 'inactivo', 'bloqueado'] } };
    }
}
exports.CreateClientDataDto = CreateClientDataDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['individual', 'empresa']),
    __metadata("design:type", String)
], CreateClientDataDto.prototype, "tipo_cliente", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['web', 'admin', 'bot']),
    __metadata("design:type", String)
], CreateClientDataDto.prototype, "origen_registro", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['normal', 'vip', 'frecuente']),
    __metadata("design:type", String)
], CreateClientDataDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['whatsapp', 'email']),
    __metadata("design:type", String)
], CreateClientDataDto.prototype, "preferencia_contacto", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['activo', 'inactivo', 'bloqueado']),
    __metadata("design:type", String)
], CreateClientDataDto.prototype, "estado", void 0);
//# sourceMappingURL=create-client-data.dto.js.map