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
exports.FiltrosReemplazoDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FiltrosReemplazoDto {
    search;
    estado;
    page;
    limit;
    sort;
    order;
    static _OPENAPI_METADATA_FACTORY() {
        return { search: { required: false, type: () => String }, estado: { required: false, type: () => String }, page: { required: false, type: () => Number }, limit: { required: false, type: () => Number }, sort: { required: false, type: () => String, enum: ['nombre', 'estado', 'creado_en'] }, order: { required: false, type: () => String, enum: ['asc', 'desc', 'ASC', 'DESC'] } };
    }
}
exports.FiltrosReemplazoDto = FiltrosReemplazoDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FiltrosReemplazoDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FiltrosReemplazoDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], FiltrosReemplazoDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], FiltrosReemplazoDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['nombre', 'estado', 'creado_en']),
    __metadata("design:type", String)
], FiltrosReemplazoDto.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['asc', 'desc', 'ASC', 'DESC']),
    __metadata("design:type", String)
], FiltrosReemplazoDto.prototype, "order", void 0);
//# sourceMappingURL=filtros-reemplazo.dto.js.map