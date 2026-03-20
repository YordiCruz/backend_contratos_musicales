"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EspecialidadesModule = void 0;
const common_1 = require("@nestjs/common");
const especialidads_module_1 = require("./especialidads/especialidads.module");
const categorias_especialidads_module_1 = require("./categorias_especialidads/categorias_especialidads.module");
let EspecialidadesModule = class EspecialidadesModule {
};
exports.EspecialidadesModule = EspecialidadesModule;
exports.EspecialidadesModule = EspecialidadesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            especialidads_module_1.EspecialidadsModule,
            categorias_especialidads_module_1.CategoriasEspecialidadsModule
        ],
        exports: [
            especialidads_module_1.EspecialidadsModule,
            categorias_especialidads_module_1.CategoriasEspecialidadsModule
        ]
    })
], EspecialidadesModule);
//# sourceMappingURL=especialidades.module.js.map