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
exports.Reemplazo = void 0;
const openapi = require("@nestjs/swagger");
const contrato_reemplazo_entity_1 = require("../../contratos/entities/contrato-reemplazo.entity");
const persona_entity_1 = require("../../personas/entities/persona.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const reemplazo_especialidad_entity_1 = require("./reemplazo-especialidad.entity");
let Reemplazo = class Reemplazo {
    id;
    persona;
    tarifa_base_hora;
    moneda;
    estado;
    disponible;
    contratos;
    registrado_por;
    creado_en;
    actualizado_en;
    eliminado_en;
    especialidadesAsignadas;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, persona: { required: true, type: () => require("../../personas/entities/persona.entity").Persona }, tarifa_base_hora: { required: true, type: () => Number }, moneda: { required: true, type: () => String }, estado: { required: true, type: () => String }, disponible: { required: true, type: () => Boolean }, contratos: { required: true, type: () => [require("../../contratos/entities/contrato-reemplazo.entity").ContratoReemplazo] }, registrado_por: { required: true, type: () => require("../../users/entities/user.entity").User }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date }, eliminado_en: { required: true, type: () => Date }, especialidadesAsignadas: { required: true, type: () => [require("./reemplazo-especialidad.entity").ReemplazoEspecialidad] } };
    }
};
exports.Reemplazo = Reemplazo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Reemplazo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => persona_entity_1.Persona, persona => persona.id),
    (0, typeorm_1.JoinColumn)({ name: 'id_persona' }),
    __metadata("design:type", persona_entity_1.Persona)
], Reemplazo.prototype, "persona", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Reemplazo.prototype, "tarifa_base_hora", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4, nullable: false, enum: ['USD', 'BOB'] }),
    __metadata("design:type", String)
], Reemplazo.prototype, "moneda", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, default: 'activo' }),
    __metadata("design:type", String)
], Reemplazo.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Reemplazo.prototype, "disponible", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contrato_reemplazo_entity_1.ContratoReemplazo, contratoReemplazo => contratoReemplazo.reemplazo),
    __metadata("design:type", Array)
], Reemplazo.prototype, "contratos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'registrado_por' }),
    __metadata("design:type", user_entity_1.User)
], Reemplazo.prototype, "registrado_por", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Reemplazo.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Reemplazo.prototype, "actualizado_en", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Reemplazo.prototype, "eliminado_en", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reemplazo_especialidad_entity_1.ReemplazoEspecialidad, re => re.reemplazo),
    __metadata("design:type", Array)
], Reemplazo.prototype, "especialidadesAsignadas", void 0);
exports.Reemplazo = Reemplazo = __decorate([
    (0, typeorm_1.Entity)('group_replacements')
], Reemplazo);
//# sourceMappingURL=reemplazo.entity.js.map