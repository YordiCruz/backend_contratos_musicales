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
exports.Media = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const evento_entity_1 = require("../../eventos/entities/evento.entity");
let Media = class Media {
    id_media;
    evento;
    tipo;
    url;
    descripcion;
    orden;
    visibilidad_publica;
    creado_en;
    static _OPENAPI_METADATA_FACTORY() {
        return { id_media: { required: true, type: () => String }, evento: { required: true, type: () => require("../../eventos/entities/evento.entity").Evento }, tipo: { required: true, type: () => String }, url: { required: true, type: () => String }, descripcion: { required: false, type: () => String }, orden: { required: false, type: () => Number }, visibilidad_publica: { required: true, type: () => Boolean }, creado_en: { required: true, type: () => Date } };
    }
};
exports.Media = Media;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Media.prototype, "id_media", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => evento_entity_1.Evento, evento => evento.media),
    __metadata("design:type", evento_entity_1.Evento)
], Media.prototype, "evento", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], Media.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Media.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Media.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Media.prototype, "orden", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Media.prototype, "visibilidad_publica", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Media.prototype, "creado_en", void 0);
exports.Media = Media = __decorate([
    (0, typeorm_1.Entity)('media_events')
], Media);
//# sourceMappingURL=media.entity.js.map