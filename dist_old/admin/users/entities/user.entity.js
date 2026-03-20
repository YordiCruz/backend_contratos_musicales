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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const pago_entity_1 = require("../../contratos/entities/pago.entity");
const evento_entity_1 = require("../../eventos/eventos/entities/evento.entity");
const persona_entity_1 = require("../../personas/entities/persona.entity");
const reemplazo_entity_1 = require("../../reemplazos/entities/reemplazo.entity");
const role_entity_1 = require("../../roles/entities/role.entity");
const client_entity_1 = require("../../../client/clients/entities/client.entity");
const typeorm_1 = require("typeorm");
let User = class User {
    id;
    email;
    password_hash;
    ultimo_login;
    estado;
    origen_registro;
    roles;
    registrado_por;
    persona;
    clientes_registrados;
    reemplazos_registrados;
    eventos_registrados;
    creado_en;
    actualizado_en;
    eliminado_en;
    pagos;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, email: { required: true, type: () => String }, password_hash: { required: true, type: () => String }, ultimo_login: { required: true, type: () => Date }, estado: { required: true, type: () => String }, origen_registro: { required: true, type: () => String }, roles: { required: true, type: () => [require("../../roles/entities/role.entity").Role] }, registrado_por: { required: true, type: () => require("./user.entity").User }, persona: { required: true, type: () => require("../../personas/entities/persona.entity").Persona }, clientes_registrados: { required: true, type: () => [require("../../../client/clients/entities/client.entity").Client] }, reemplazos_registrados: { required: true, type: () => [require("../../reemplazos/entities/reemplazo.entity").Reemplazo] }, eventos_registrados: { required: true, type: () => [require("../../eventos/eventos/entities/evento.entity").Evento] }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date }, eliminado_en: { required: true, type: () => Date, nullable: true }, pagos: { required: true, type: () => [require("../../contratos/entities/pago.entity").Pago] } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 100,
        nullable: false,
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "password_hash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Date)
], User.prototype, "ultimo_login", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'activo'
    }),
    __metadata("design:type", String)
], User.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'admin'
    }),
    __metadata("design:type", String)
], User.prototype, "origen_registro", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.Role, (role) => role.users),
    (0, typeorm_1.JoinTable)({
        name: 'user_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' }
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'registrado_por' }),
    __metadata("design:type", User)
], User.prototype, "registrado_por", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => persona_entity_1.Persona, (persona) => persona.user),
    (0, typeorm_1.JoinColumn)({ name: 'persona_id' }),
    __metadata("design:type", persona_entity_1.Persona)
], User.prototype, "persona", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => client_entity_1.Client, (cliente) => cliente.registrado_por),
    __metadata("design:type", Array)
], User.prototype, "clientes_registrados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reemplazo_entity_1.Reemplazo, (reemplazo) => reemplazo.registrado_por),
    __metadata("design:type", Array)
], User.prototype, "reemplazos_registrados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evento_entity_1.Evento, (evento) => evento.creado_por),
    __metadata("design:type", Array)
], User.prototype, "eventos_registrados", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], User.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], User.prototype, "actualizado_en", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "eliminado_en", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pago_entity_1.Pago, (pago) => pago.registrado_por),
    __metadata("design:type", Array)
], User.prototype, "pagos", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map