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
exports.Evento = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const categoria_entity_1 = require("../../categorias/entities/categoria.entity");
const user_entity_1 = require("../../../users/entities/user.entity");
const media_entity_1 = require("../../media/entities/media.entity");
const contrato_entity_1 = require("../../../contratos/entities/contrato.entity");
let Evento = class Evento {
    id_evento;
    categoria;
    id_categoria;
    nombre;
    descripcion;
    estado;
    precio_base;
    contratos;
    creado_por;
    creado_por_id;
    creado_en;
    actualizado_en;
    actualizado_por;
    eliminado_en;
    media;
    static _OPENAPI_METADATA_FACTORY() {
        return { id_evento: { required: true, type: () => String }, categoria: { required: true, type: () => require("../../categorias/entities/categoria.entity").Categoria }, id_categoria: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: false, type: () => String }, estado: { required: true, type: () => String }, precio_base: { required: true, type: () => Number }, contratos: { required: true, type: () => [require("../../../contratos/entities/contrato.entity").Contrato] }, creado_por: { required: true, type: () => require("../../../users/entities/user.entity").User }, creado_por_id: { required: true, type: () => String }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date }, actualizado_por: { required: true, type: () => String }, eliminado_en: { required: true, type: () => Date }, media: { required: true, type: () => [require("../../media/entities/media.entity").Media] } };
    }
};
exports.Evento = Evento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Evento.prototype, "id_evento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_entity_1.Categoria, categoria => categoria.eventos),
    (0, typeorm_1.JoinColumn)({ name: 'id_categoria' }),
    __metadata("design:type", categoria_entity_1.Categoria)
], Evento.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Evento.prototype, "id_categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], Evento.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Evento.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, default: 'activo' }),
    __metadata("design:type", String)
], Evento.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Evento.prototype, "precio_base", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contrato_entity_1.Contrato, contrato => contrato.evento),
    __metadata("design:type", Array)
], Evento.prototype, "contratos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, usuario => usuario.eventos_registrados),
    (0, typeorm_1.JoinColumn)({ name: 'creado_por' }),
    __metadata("design:type", user_entity_1.User)
], Evento.prototype, "creado_por", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Evento.prototype, "creado_por_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Evento.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Evento.prototype, "actualizado_en", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Evento.prototype, "actualizado_por", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Evento.prototype, "eliminado_en", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => media_entity_1.Media, media => media.evento),
    __metadata("design:type", Array)
], Evento.prototype, "media", void 0);
exports.Evento = Evento = __decorate([
    (0, typeorm_1.Entity)('events')
], Evento);
//# sourceMappingURL=evento.entity.js.map