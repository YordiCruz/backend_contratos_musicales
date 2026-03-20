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
exports.ReemplazoEspecialidad = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const especialidad_entity_1 = require("../../especialidades/especialidads/entities/especialidad.entity");
const reemplazo_entity_1 = require("./reemplazo.entity");
let ReemplazoEspecialidad = class ReemplazoEspecialidad {
    id;
    reemplazo;
    especialidad;
    tipo;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, reemplazo: { required: true, type: () => require("./reemplazo.entity").Reemplazo }, especialidad: { required: true, type: () => require("../../especialidades/especialidads/entities/especialidad.entity").Especialidad }, tipo: { required: true, type: () => String } };
    }
};
exports.ReemplazoEspecialidad = ReemplazoEspecialidad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReemplazoEspecialidad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reemplazo_entity_1.Reemplazo, reemplazo => reemplazo.especialidadesAsignadas),
    (0, typeorm_1.JoinColumn)({ name: 'id_reemplazo' }),
    __metadata("design:type", reemplazo_entity_1.Reemplazo)
], ReemplazoEspecialidad.prototype, "reemplazo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => especialidad_entity_1.Especialidad, especialidad => especialidad.integrantesAsignados),
    (0, typeorm_1.JoinColumn)({ name: 'id_especialidad' }),
    __metadata("design:type", especialidad_entity_1.Especialidad)
], ReemplazoEspecialidad.prototype, "especialidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'primaria' }),
    __metadata("design:type", String)
], ReemplazoEspecialidad.prototype, "tipo", void 0);
exports.ReemplazoEspecialidad = ReemplazoEspecialidad = __decorate([
    (0, typeorm_1.Entity)('replacements_specialties')
], ReemplazoEspecialidad);
//# sourceMappingURL=reemplazo-especialidad.entity.js.map