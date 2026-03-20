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
exports.TipoServicioEspecialidad = void 0;
const openapi = require("@nestjs/swagger");
const especialidad_entity_1 = require("../../especialidades/especialidads/entities/especialidad.entity");
const typeorm_1 = require("typeorm");
let TipoServicioEspecialidad = class TipoServicioEspecialidad {
    id;
    tipo_servicio;
    especialidad;
    requerido;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, tipo_servicio: { required: true, type: () => String }, especialidad: { required: true, type: () => require("../../especialidades/especialidads/entities/especialidad.entity").Especialidad }, requerido: { required: true, type: () => Boolean } };
    }
};
exports.TipoServicioEspecialidad = TipoServicioEspecialidad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TipoServicioEspecialidad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TipoServicioEspecialidad.prototype, "tipo_servicio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => especialidad_entity_1.Especialidad, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_especialidad' }),
    __metadata("design:type", especialidad_entity_1.Especialidad)
], TipoServicioEspecialidad.prototype, "especialidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], TipoServicioEspecialidad.prototype, "requerido", void 0);
exports.TipoServicioEspecialidad = TipoServicioEspecialidad = __decorate([
    (0, typeorm_1.Entity)('servicio_especialidades')
], TipoServicioEspecialidad);
//# sourceMappingURL=tipo-servicio-especialidad.entity.js.map