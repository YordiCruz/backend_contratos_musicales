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
exports.ContratoIntegrante = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const contrato_entity_1 = require("./contrato.entity");
const integrante_entity_1 = require("../../integrantes/entities/integrante.entity");
let ContratoIntegrante = class ContratoIntegrante {
    id_contrato;
    id_integrante;
    contrato;
    integrante;
    especialidad;
    compensacion_hora;
    horas_contratadas;
    estado;
    creado_en;
    static _OPENAPI_METADATA_FACTORY() {
        return { id_contrato: { required: true, type: () => String }, id_integrante: { required: true, type: () => String }, contrato: { required: true, type: () => require("./contrato.entity").Contrato }, integrante: { required: true, type: () => require("../../integrantes/entities/integrante.entity").Integrante }, especialidad: { required: true, type: () => String }, compensacion_hora: { required: true, type: () => Number }, horas_contratadas: { required: true, type: () => Number }, estado: { required: true, type: () => String }, creado_en: { required: true, type: () => Date } };
    }
};
exports.ContratoIntegrante = ContratoIntegrante;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], ContratoIntegrante.prototype, "id_contrato", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], ContratoIntegrante.prototype, "id_integrante", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contrato_entity_1.Contrato, contrato => contrato.integrantes, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_contrato' }),
    __metadata("design:type", contrato_entity_1.Contrato)
], ContratoIntegrante.prototype, "contrato", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => integrante_entity_1.Integrante, integrante => integrante.contratos),
    (0, typeorm_1.JoinColumn)({ name: 'id_integrante' }),
    __metadata("design:type", integrante_entity_1.Integrante)
], ContratoIntegrante.prototype, "integrante", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], ContratoIntegrante.prototype, "especialidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ContratoIntegrante.prototype, "compensacion_hora", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ContratoIntegrante.prototype, "horas_contratadas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'pendiente' }),
    __metadata("design:type", String)
], ContratoIntegrante.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ContratoIntegrante.prototype, "creado_en", void 0);
exports.ContratoIntegrante = ContratoIntegrante = __decorate([
    (0, typeorm_1.Entity)('contrato_integrante')
], ContratoIntegrante);
//# sourceMappingURL=contrato-integrante.entity.js.map