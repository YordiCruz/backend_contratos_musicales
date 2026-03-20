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
exports.Categoria = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const evento_entity_1 = require("../../eventos/entities/evento.entity");
let Categoria = class Categoria {
    id_categoria;
    nombre;
    descripcion;
    estado;
    eventos;
    creado_por;
    actualizado_por;
    creado_en;
    actualizado_en;
    eliminado_en;
    static _OPENAPI_METADATA_FACTORY() {
        return { id_categoria: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: false, type: () => String }, estado: { required: true, type: () => String }, eventos: { required: true, type: () => [require("../../eventos/entities/evento.entity").Evento] }, creado_por: { required: true, type: () => String }, actualizado_por: { required: true, type: () => String }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date }, eliminado_en: { required: true, type: () => Date } };
    }
};
exports.Categoria = Categoria;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Categoria.prototype, "id_categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], Categoria.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Categoria.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'activo' }),
    __metadata("design:type", String)
], Categoria.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evento_entity_1.Evento, evento => evento.categoria),
    __metadata("design:type", Array)
], Categoria.prototype, "eventos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Categoria.prototype, "creado_por", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Categoria.prototype, "actualizado_por", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Categoria.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Categoria.prototype, "actualizado_en", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Categoria.prototype, "eliminado_en", void 0);
exports.Categoria = Categoria = __decorate([
    (0, typeorm_1.Entity)('categories_events')
], Categoria);
//# sourceMappingURL=categoria.entity.js.map