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
exports.Client = void 0;
const openapi = require("@nestjs/swagger");
const contrato_entity_1 = require("../../contratos/entities/contrato.entity");
const persona_entity_1 = require("../../personas/entities/persona.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let Client = class Client {
    id;
    persona;
    tipo_cliente;
    origen_registro;
    categoria;
    preferencia_contacto;
    contratos;
    registrado_por;
    creado_en;
    actualizado_en;
    eliminado_en;
    estado;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, persona: { required: true, type: () => require("../../personas/entities/persona.entity").Persona }, tipo_cliente: { required: true, type: () => String }, origen_registro: { required: true, type: () => String }, categoria: { required: true, type: () => String }, preferencia_contacto: { required: true, type: () => String }, contratos: { required: true, type: () => [require("../../contratos/entities/contrato.entity").Contrato] }, registrado_por: { required: true, type: () => require("../../users/entities/user.entity").User }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date }, eliminado_en: { required: true, type: () => Date, nullable: true }, estado: { required: true, type: () => String } };
    }
};
exports.Client = Client;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Client.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => persona_entity_1.Persona, { eager: true, cascade: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_persona' }),
    __metadata("design:type", persona_entity_1.Persona)
], Client.prototype, "persona", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'individual' }),
    __metadata("design:type", String)
], Client.prototype, "tipo_cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'web' }),
    __metadata("design:type", String)
], Client.prototype, "origen_registro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'normal' }),
    __metadata("design:type", String)
], Client.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "preferencia_contacto", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contrato_entity_1.Contrato, contrato => contrato.cliente),
    __metadata("design:type", Array)
], Client.prototype, "contratos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'registrado_por' }),
    __metadata("design:type", user_entity_1.User)
], Client.prototype, "registrado_por", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'creado_en' }),
    __metadata("design:type", Date)
], Client.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'actualizado_en' }),
    __metadata("design:type", Date)
], Client.prototype, "actualizado_en", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Client.prototype, "eliminado_en", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'activo' }),
    __metadata("design:type", String)
], Client.prototype, "estado", void 0);
exports.Client = Client = __decorate([
    (0, typeorm_1.Entity)('clients')
], Client);
//# sourceMappingURL=client.entity.js.map