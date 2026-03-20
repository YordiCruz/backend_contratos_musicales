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
exports.Ubicacion = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const contrato_entity_1 = require("./contrato.entity");
let Ubicacion = class Ubicacion {
    id_ubicacion;
    nombre;
    direccion;
    latitud;
    longitud;
    capacidad;
    contratos;
    static _OPENAPI_METADATA_FACTORY() {
        return { id_ubicacion: { required: true, type: () => String }, nombre: { required: true, type: () => String }, direccion: { required: true, type: () => String }, latitud: { required: true, type: () => Number }, longitud: { required: true, type: () => Number }, capacidad: { required: true, type: () => Number }, contratos: { required: true, type: () => [require("./contrato.entity").Contrato] } };
    }
};
exports.Ubicacion = Ubicacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Ubicacion.prototype, "id_ubicacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Ubicacion.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Ubicacion.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], Ubicacion.prototype, "latitud", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], Ubicacion.prototype, "longitud", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Ubicacion.prototype, "capacidad", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contrato_entity_1.Contrato, contrato => contrato.ubicacion),
    __metadata("design:type", Array)
], Ubicacion.prototype, "contratos", void 0);
exports.Ubicacion = Ubicacion = __decorate([
    (0, typeorm_1.Entity)('ubicaciones')
], Ubicacion);
//# sourceMappingURL=ubicacion.entity.js.map