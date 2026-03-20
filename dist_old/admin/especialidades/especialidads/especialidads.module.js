"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EspecialidadsModule = void 0;
const common_1 = require("@nestjs/common");
const especialidads_service_1 = require("./especialidads.service");
const typeorm_1 = require("@nestjs/typeorm");
const especialidad_entity_1 = require("./entities/especialidad.entity");
const categorias_especialidad_entity_1 = require("../categorias_especialidads/entities/categorias_especialidad.entity");
let EspecialidadsModule = class EspecialidadsModule {
};
exports.EspecialidadsModule = EspecialidadsModule;
exports.EspecialidadsModule = EspecialidadsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([especialidad_entity_1.Especialidad, categorias_especialidad_entity_1.CategoriasEspecialidad])],
        providers: [especialidads_service_1.EspecialidadsService],
        exports: [especialidads_service_1.EspecialidadsService],
    })
], EspecialidadsModule);
//# sourceMappingURL=especialidads.module.js.map