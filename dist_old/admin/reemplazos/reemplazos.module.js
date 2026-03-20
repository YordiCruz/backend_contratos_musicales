"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReemplazosModule = void 0;
const common_1 = require("@nestjs/common");
const reemplazos_service_1 = require("./reemplazos.service");
const typeorm_1 = require("@nestjs/typeorm");
const reemplazo_entity_1 = require("./entities/reemplazo.entity");
const especialidad_entity_1 = require("../especialidades/especialidads/entities/especialidad.entity");
let ReemplazosModule = class ReemplazosModule {
};
exports.ReemplazosModule = ReemplazosModule;
exports.ReemplazosModule = ReemplazosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([reemplazo_entity_1.Reemplazo, especialidad_entity_1.Especialidad])],
        providers: [reemplazos_service_1.ReemplazosService],
        exports: [reemplazos_service_1.ReemplazosService],
    })
], ReemplazosModule);
//# sourceMappingURL=reemplazos.module.js.map