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
exports.ContratoEspecialidad = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const contrato_entity_1 = require("./contrato.entity");
const especialidad_entity_1 = require("../../especialidades/especialidads/entities/especialidad.entity");
let ContratoEspecialidad = class ContratoEspecialidad {
    id;
    contrato;
    especialidad;
    tipo_asignacion;
    requerido;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, contrato: { required: true, type: () => require("./contrato.entity").Contrato }, especialidad: { required: true, type: () => require("../../especialidades/especialidads/entities/especialidad.entity").Especialidad }, tipo_asignacion: { required: true, type: () => Object }, requerido: { required: true, type: () => Boolean } };
    }
};
exports.ContratoEspecialidad = ContratoEspecialidad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ContratoEspecialidad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contrato_entity_1.Contrato, contrato => contrato.especialidades, { onDelete: 'CASCADE' }),
    __metadata("design:type", contrato_entity_1.Contrato)
], ContratoEspecialidad.prototype, "contrato", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => especialidad_entity_1.Especialidad, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_especialidad' }),
    __metadata("design:type", especialidad_entity_1.Especialidad)
], ContratoEspecialidad.prototype, "especialidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], ContratoEspecialidad.prototype, "tipo_asignacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ContratoEspecialidad.prototype, "requerido", void 0);
exports.ContratoEspecialidad = ContratoEspecialidad = __decorate([
    (0, typeorm_1.Entity)('contrato_especialidades')
], ContratoEspecialidad);
//# sourceMappingURL=contrato-especialidad.entity.js.map