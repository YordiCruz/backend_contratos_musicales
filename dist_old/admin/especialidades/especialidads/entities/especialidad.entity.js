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
exports.Especialidad = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const categorias_especialidad_entity_1 = require("../../categorias_especialidads/entities/categorias_especialidad.entity");
const integrante_especialidad_entity_1 = require("../../../integrantes/entities/integrante-especialidad.entity");
const reemplazo_especialidad_entity_1 = require("../../../reemplazos/entities/reemplazo-especialidad.entity");
let Especialidad = class Especialidad {
    id;
    categoria;
    nombre;
    descripcion;
    estado;
    creado_en;
    actualizado_en;
    eliminado_en;
    integrantesAsignados;
    reemplazosAsignados;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, categoria: { required: true, type: () => require("../../categorias_especialidads/entities/categorias_especialidad.entity").CategoriasEspecialidad }, nombre: { required: true, type: () => String }, descripcion: { required: false, type: () => String }, estado: { required: true, type: () => String }, creado_en: { required: true, type: () => Date }, actualizado_en: { required: true, type: () => Date }, eliminado_en: { required: true, type: () => Date }, integrantesAsignados: { required: true, type: () => [require("../../../integrantes/entities/integrante-especialidad.entity").IntegranteEspecialidad] }, reemplazosAsignados: { required: true, type: () => [require("../../../reemplazos/entities/reemplazo-especialidad.entity").ReemplazoEspecialidad] } };
    }
};
exports.Especialidad = Especialidad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Especialidad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categorias_especialidad_entity_1.CategoriasEspecialidad, categoria => categoria.especialidades),
    (0, typeorm_1.JoinColumn)({ name: 'id_categoria' }),
    __metadata("design:type", categorias_especialidad_entity_1.CategoriasEspecialidad)
], Especialidad.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false, unique: true }),
    __metadata("design:type", String)
], Especialidad.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Especialidad.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'activo' }),
    __metadata("design:type", String)
], Especialidad.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Especialidad.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Especialidad.prototype, "actualizado_en", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Especialidad.prototype, "eliminado_en", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => integrante_especialidad_entity_1.IntegranteEspecialidad, ie => ie.especialidad),
    __metadata("design:type", Array)
], Especialidad.prototype, "integrantesAsignados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reemplazo_especialidad_entity_1.ReemplazoEspecialidad, re => re.especialidad),
    __metadata("design:type", Array)
], Especialidad.prototype, "reemplazosAsignados", void 0);
exports.Especialidad = Especialidad = __decorate([
    (0, typeorm_1.Entity)('specialties')
], Especialidad);
//# sourceMappingURL=especialidad.entity.js.map