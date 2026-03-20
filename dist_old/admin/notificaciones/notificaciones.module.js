"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacionesModule = void 0;
const common_1 = require("@nestjs/common");
const notificaciones_service_1 = require("./notificaciones.service");
const notificaciones_controller_1 = require("./notificaciones.controller");
const contratos_module_1 = require("../contratos/contratos.module");
const typeorm_1 = require("@nestjs/typeorm");
const notificacione_entity_1 = require("./entities/notificacione.entity");
const contrato_entity_1 = require("../contratos/entities/contrato.entity");
const persona_entity_1 = require("../personas/entities/persona.entity");
const email_service_1 = require("../email/email.service");
const personas_module_1 = require("../personas/personas.module");
const integrante_especialidad_entity_1 = require("../integrantes/entities/integrante-especialidad.entity");
const integrante_entity_1 = require("../integrantes/entities/integrante.entity");
const tipo_servicio_especialidad_entity_1 = require("../contratos/entities/tipo-servicio-especialidad.entity");
const reemplazo_entity_1 = require("../reemplazos/entities/reemplazo.entity");
let NotificacionesModule = class NotificacionesModule {
};
exports.NotificacionesModule = NotificacionesModule;
exports.NotificacionesModule = NotificacionesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([notificacione_entity_1.Notificacione, contrato_entity_1.Contrato, persona_entity_1.Persona, integrante_especialidad_entity_1.IntegranteEspecialidad, integrante_entity_1.Integrante, tipo_servicio_especialidad_entity_1.TipoServicioEspecialidad, reemplazo_entity_1.Reemplazo]),
            (0, common_1.forwardRef)(() => contratos_module_1.ContratosModule),
            personas_module_1.PersonasModule
        ],
        controllers: [notificaciones_controller_1.NotificacionesController],
        providers: [notificaciones_service_1.NotificacionesService, email_service_1.EmailService],
        exports: [notificaciones_service_1.NotificacionesService],
    })
], NotificacionesModule);
//# sourceMappingURL=notificaciones.module.js.map