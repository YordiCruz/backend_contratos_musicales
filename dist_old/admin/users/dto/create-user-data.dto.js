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
exports.CreateUserDataDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDataDto {
    email;
    password_hash;
    ultimo_login;
    estado = 'activo';
    origen_registro = 'admin';
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String, description: "Nombre de usuario \u00FAnico" }, password_hash: { required: true, type: () => String, description: "Hash o contrase\u00F1a en texto plano (seg\u00FAn tu l\u00F3gica de negocio)", minLength: 6 }, ultimo_login: { required: false, type: () => Date, description: "Fecha del \u00FAltimo login (opcional)" }, estado: { required: false, type: () => String, description: "Estado del usuario (por defecto: 'activo')", default: "activo", enum: ['activo', 'inactivo'] }, origen_registro: { required: false, type: () => String, description: "Origen del registro (por defecto: 'admin')", default: "admin" } };
    }
}
exports.CreateUserDataDto = CreateUserDataDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDataDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateUserDataDto.prototype, "password_hash", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateUserDataDto.prototype, "ultimo_login", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['activo', 'inactivo']),
    __metadata("design:type", String)
], CreateUserDataDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDataDto.prototype, "origen_registro", void 0);
//# sourceMappingURL=create-user-data.dto.js.map