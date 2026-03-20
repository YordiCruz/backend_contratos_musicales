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
exports.Notificacione = void 0;
const openapi = require("@nestjs/swagger");
const contrato_entity_1 = require("../../contratos/entities/contrato.entity");
const persona_entity_1 = require("../../personas/entities/persona.entity");
const typeorm_1 = require("typeorm");
let Notificacione = class Notificacione {
    id;
    tipo;
    mensaje;
    fecha;
    persona;
    contrato;
    estado;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, tipo: { required: true, type: () => String }, mensaje: { required: true, type: () => String }, fecha: { required: true, type: () => Date }, persona: { required: true, type: () => require("../../personas/entities/persona.entity").Persona }, contrato: { required: true, type: () => require("../../contratos/entities/contrato.entity").Contrato }, estado: { required: true, type: () => Object } };
    }
};
exports.Notificacione = Notificacione;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Notificacione.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Notificacione.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Notificacione.prototype, "mensaje", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Notificacione.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => persona_entity_1.Persona, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'persona_id' }),
    __metadata("design:type", persona_entity_1.Persona)
], Notificacione.prototype, "persona", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contrato_entity_1.Contrato, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'contrato_id' }),
    __metadata("design:type", contrato_entity_1.Contrato)
], Notificacione.prototype, "contrato", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pendiente' }),
    __metadata("design:type", String)
], Notificacione.prototype, "estado", void 0);
exports.Notificacione = Notificacione = __decorate([
    (0, typeorm_1.Entity)('notificaciones')
], Notificacione);
//# sourceMappingURL=notificacione.entity.js.map