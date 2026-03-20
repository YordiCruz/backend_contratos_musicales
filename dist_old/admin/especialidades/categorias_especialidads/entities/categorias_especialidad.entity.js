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
exports.CategoriasEspecialidad = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const especialidad_entity_1 = require("../../especialidads/entities/especialidad.entity");
let CategoriasEspecialidad = class CategoriasEspecialidad {
    id;
    nombre;
    icono;
    estado;
    creado_en;
    actualizado_en;
    eliminado_en;
    especialidades;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, icono: { required: false, type: () => String }, estado: { required: true, type: () => String }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date }, eliminado_en: { required: true, type: () => Date }, especialidades: { required: true, type: () => [require("../../especialidads/entities/especialidad.entity").Especialidad] } };
    }
};
exports.CategoriasEspecialidad = CategoriasEspecialidad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CategoriasEspecialidad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], CategoriasEspecialidad.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], CategoriasEspecialidad.prototype, "icono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'activo' }),
    __metadata("design:type", String)
], CategoriasEspecialidad.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], CategoriasEspecialidad.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], CategoriasEspecialidad.prototype, "actualizado_en", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CategoriasEspecialidad.prototype, "eliminado_en", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => especialidad_entity_1.Especialidad, especialidad => especialidad.categoria),
    __metadata("design:type", Array)
], CategoriasEspecialidad.prototype, "especialidades", void 0);
exports.CategoriasEspecialidad = CategoriasEspecialidad = __decorate([
    (0, typeorm_1.Entity)('specialty_categories')
], CategoriasEspecialidad);
//# sourceMappingURL=categorias_especialidad.entity.js.map