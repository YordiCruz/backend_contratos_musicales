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
exports.DisponibilidadEvento = void 0;
const openapi = require("@nestjs/swagger");
const contrato_entity_1 = require("../../contratos/entities/contrato.entity");
const typeorm_1 = require("typeorm");
let DisponibilidadEvento = class DisponibilidadEvento {
    id;
    fecha;
    bloque;
    estado;
    contrato;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, fecha: { required: true, type: () => Date }, bloque: { required: true, type: () => String }, estado: { required: true, type: () => String }, contrato: { required: true, type: () => require("../../contratos/entities/contrato.entity").Contrato, nullable: true } };
    }
};
exports.DisponibilidadEvento = DisponibilidadEvento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DisponibilidadEvento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], DisponibilidadEvento.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], DisponibilidadEvento.prototype, "bloque", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'libre' }),
    __metadata("design:type", String)
], DisponibilidadEvento.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contrato_entity_1.Contrato, contrato => contrato.id_contrato, { nullable: true }),
    __metadata("design:type", Object)
], DisponibilidadEvento.prototype, "contrato", void 0);
exports.DisponibilidadEvento = DisponibilidadEvento = __decorate([
    (0, typeorm_1.Entity)('disponibilidad_eventos')
], DisponibilidadEvento);
//# sourceMappingURL=disponibilidad-evento.entity.js.map