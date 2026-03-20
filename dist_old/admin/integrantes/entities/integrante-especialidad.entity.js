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
exports.IntegranteEspecialidad = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const integrante_entity_1 = require("./integrante.entity");
const especialidad_entity_1 = require("../../especialidades/especialidads/entities/especialidad.entity");
let IntegranteEspecialidad = class IntegranteEspecialidad {
    id;
    integrante;
    especialidad;
    tipo;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, integrante: { required: true, type: () => require("./integrante.entity").Integrante }, especialidad: { required: true, type: () => require("../../especialidades/especialidads/entities/especialidad.entity").Especialidad }, tipo: { required: true, type: () => String } };
    }
};
exports.IntegranteEspecialidad = IntegranteEspecialidad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], IntegranteEspecialidad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => integrante_entity_1.Integrante, integrante => integrante.especialidadesAsignadas),
    (0, typeorm_1.JoinColumn)({ name: 'id_integrante' }),
    __metadata("design:type", integrante_entity_1.Integrante)
], IntegranteEspecialidad.prototype, "integrante", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => especialidad_entity_1.Especialidad, especialidad => especialidad.integrantesAsignados),
    (0, typeorm_1.JoinColumn)({ name: 'id_especialidad' }),
    __metadata("design:type", especialidad_entity_1.Especialidad)
], IntegranteEspecialidad.prototype, "especialidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'primario' }),
    __metadata("design:type", String)
], IntegranteEspecialidad.prototype, "tipo", void 0);
exports.IntegranteEspecialidad = IntegranteEspecialidad = __decorate([
    (0, typeorm_1.Entity)('members_specialties')
], IntegranteEspecialidad);
//# sourceMappingURL=integrante-especialidad.entity.js.map