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
exports.ContratoReemplazo = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const contrato_entity_1 = require("./contrato.entity");
const reemplazo_entity_1 = require("../../reemplazos/entities/reemplazo.entity");
let ContratoReemplazo = class ContratoReemplazo {
    id_contrato;
    id_reemplazo;
    contrato;
    reemplazo;
    especialidad;
    estado;
    compensacion_hora;
    horas_contratadas;
    creado_en;
    static _OPENAPI_METADATA_FACTORY() {
        return { id_contrato: { required: true, type: () => String }, id_reemplazo: { required: true, type: () => String }, contrato: { required: true, type: () => require("./contrato.entity").Contrato }, reemplazo: { required: true, type: () => require("../../reemplazos/entities/reemplazo.entity").Reemplazo }, especialidad: { required: true, type: () => String }, estado: { required: true, type: () => String }, compensacion_hora: { required: true, type: () => Number }, horas_contratadas: { required: true, type: () => Number }, creado_en: { required: true, type: () => Date } };
    }
};
exports.ContratoReemplazo = ContratoReemplazo;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], ContratoReemplazo.prototype, "id_contrato", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], ContratoReemplazo.prototype, "id_reemplazo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contrato_entity_1.Contrato, contrato => contrato.reemplazos, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_contrato' }),
    __metadata("design:type", contrato_entity_1.Contrato)
], ContratoReemplazo.prototype, "contrato", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reemplazo_entity_1.Reemplazo, reempla => reempla.contratos, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_reemplazo' }),
    __metadata("design:type", reemplazo_entity_1.Reemplazo)
], ContratoReemplazo.prototype, "reemplazo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], ContratoReemplazo.prototype, "especialidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'pendiente' }),
    __metadata("design:type", String)
], ContratoReemplazo.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ContratoReemplazo.prototype, "compensacion_hora", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ContratoReemplazo.prototype, "horas_contratadas", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ContratoReemplazo.prototype, "creado_en", void 0);
exports.ContratoReemplazo = ContratoReemplazo = __decorate([
    (0, typeorm_1.Entity)('contrato_reemplazo')
], ContratoReemplazo);
//# sourceMappingURL=contrato-reemplazo.entity.js.map