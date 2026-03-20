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
exports.Persona = void 0;
const openapi = require("@nestjs/swagger");
const integrante_entity_1 = require("../../integrantes/entities/integrante.entity");
const reemplazo_entity_1 = require("../../reemplazos/entities/reemplazo.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const client_entity_1 = require("../../../client/clients/entities/client.entity");
const typeorm_1 = require("typeorm");
let Persona = class Persona {
    id;
    nombre;
    apellido;
    documento_identidad;
    email;
    telefono;
    creado_en;
    actualizado_en;
    user;
    cliente;
    integrante;
    reemplazo;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, apellido: { required: true, type: () => String }, documento_identidad: { required: true, type: () => String }, email: { required: true, type: () => String }, telefono: { required: true, type: () => String }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date }, user: { required: true, type: () => require("../../users/entities/user.entity").User }, cliente: { required: true, type: () => require("../../../client/clients/entities/client.entity").Client }, integrante: { required: true, type: () => require("../../integrantes/entities/integrante.entity").Integrante }, reemplazo: { required: true, type: () => require("../../reemplazos/entities/reemplazo.entity").Reemplazo } };
    }
};
exports.Persona = Persona;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Persona.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], Persona.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], Persona.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Persona.prototype, "documento_identidad", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], Persona.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        nullable: false,
    }),
    __metadata("design:type", String)
], Persona.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Persona.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Persona.prototype, "actualizado_en", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.persona),
    __metadata("design:type", user_entity_1.User)
], Persona.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => client_entity_1.Client, (cliente) => cliente.persona),
    __metadata("design:type", client_entity_1.Client)
], Persona.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => integrante_entity_1.Integrante, (integrante) => integrante.persona),
    __metadata("design:type", integrante_entity_1.Integrante)
], Persona.prototype, "integrante", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => reemplazo_entity_1.Reemplazo, (reemplazo) => reemplazo.persona),
    __metadata("design:type", reemplazo_entity_1.Reemplazo)
], Persona.prototype, "reemplazo", void 0);
exports.Persona = Persona = __decorate([
    (0, typeorm_1.Entity)('persons')
], Persona);
//# sourceMappingURL=persona.entity.js.map