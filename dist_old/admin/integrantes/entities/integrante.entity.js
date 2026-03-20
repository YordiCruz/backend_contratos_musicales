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
exports.Integrante = void 0;
const openapi = require("@nestjs/swagger");
const contrato_integrante_entity_1 = require("../../contratos/entities/contrato-integrante.entity");
const persona_entity_1 = require("../../personas/entities/persona.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const integrante_especialidad_entity_1 = require("./integrante-especialidad.entity");
let Integrante = class Integrante {
    id;
    id_persona;
    persona;
    tarifa_base_hora;
    moneda;
    fecha_ingreso;
    estado;
    registrado_por;
    contratos;
    creado_en;
    actualizado_en;
    eliminado_en;
    especialidadesAsignadas;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, id_persona: { required: true, type: () => String }, persona: { required: true, type: () => require("../../personas/entities/persona.entity").Persona }, tarifa_base_hora: { required: true, type: () => Number }, moneda: { required: true, type: () => String }, fecha_ingreso: { required: true, type: () => Date }, estado: { required: true, type: () => String }, registrado_por: { required: true, type: () => require("../../users/entities/user.entity").User }, contratos: { required: true, type: () => [require("../../contratos/entities/contrato-integrante.entity").ContratoIntegrante] }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date }, eliminado_en: { required: true, type: () => Date }, especialidadesAsignadas: { required: true, type: () => [require("./integrante-especialidad.entity").IntegranteEspecialidad] } };
    }
};
exports.Integrante = Integrante;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Integrante.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Integrante.prototype, "id_persona", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => persona_entity_1.Persona, persona => persona.integrante),
    (0, typeorm_1.JoinColumn)({ name: 'id_persona' }),
    __metadata("design:type", persona_entity_1.Persona)
], Integrante.prototype, "persona", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Integrante.prototype, "tarifa_base_hora", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4, nullable: false }),
    __metadata("design:type", String)
], Integrante.prototype, "moneda", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: false }),
    __metadata("design:type", Date)
], Integrante.prototype, "fecha_ingreso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'activo' }),
    __metadata("design:type", String)
], Integrante.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'registrado_por' }),
    __metadata("design:type", user_entity_1.User)
], Integrante.prototype, "registrado_por", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contrato_integrante_entity_1.ContratoIntegrante, contratoIntegrante => contratoIntegrante.integrante),
    __metadata("design:type", Array)
], Integrante.prototype, "contratos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Integrante.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Integrante.prototype, "actualizado_en", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Integrante.prototype, "eliminado_en", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => integrante_especialidad_entity_1.IntegranteEspecialidad, ie => ie.integrante),
    __metadata("design:type", Array)
], Integrante.prototype, "especialidadesAsignadas", void 0);
exports.Integrante = Integrante = __decorate([
    (0, typeorm_1.Entity)('group_members')
], Integrante);
//# sourceMappingURL=integrante.entity.js.map