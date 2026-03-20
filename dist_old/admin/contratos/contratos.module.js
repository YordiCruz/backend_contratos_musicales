"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContratosModule = void 0;
const common_1 = require("@nestjs/common");
const contratos_service_1 = require("./contratos.service");
const contratos_controller_1 = require("./contratos.controller");
const typeorm_1 = require("@nestjs/typeorm");
const contrato_entity_1 = require("./entities/contrato.entity");
const disponibilidad_evento_entity_1 = require("../disponibilidad-eventos/entities/disponibilidad-evento.entity");
const contrato_integrante_entity_1 = require("./entities/contrato-integrante.entity");
const contrato_reemplazo_entity_1 = require("./entities/contrato-reemplazo.entity");
const ubicacion_entity_1 = require("./entities/ubicacion.entity");
const ubicacion_service_1 = require("./ubicacion.service");
const ubicacion_controller_1 = require("./ubicacion.controller");
const notificacione_entity_1 = require("../notificaciones/entities/notificacione.entity");
const notificaciones_module_1 = require("../notificaciones/notificaciones.module");
const persona_entity_1 = require("../personas/entities/persona.entity");
const user_entity_1 = require("../users/entities/user.entity");
const tipo_servicio_especialidad_entity_1 = require("./entities/tipo-servicio-especialidad.entity");
const integrante_entity_1 = require("../integrantes/entities/integrante.entity");
const reemplazo_entity_1 = require("../reemplazos/entities/reemplazo.entity");
let ContratosModule = class ContratosModule {
};
exports.ContratosModule = ContratosModule;
exports.ContratosModule = ContratosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([contrato_entity_1.Contrato, disponibilidad_evento_entity_1.DisponibilidadEvento, contrato_integrante_entity_1.ContratoIntegrante, contrato_reemplazo_entity_1.ContratoReemplazo, ubicacion_entity_1.Ubicacion, notificacione_entity_1.Notificacione, persona_entity_1.Persona, user_entity_1.User, tipo_servicio_especialidad_entity_1.TipoServicioEspecialidad, integrante_entity_1.Integrante, reemplazo_entity_1.Reemplazo]),
            (0, common_1.forwardRef)(() => (notificaciones_module_1.NotificacionesModule)),
        ],
        controllers: [contratos_controller_1.ContratosController, ubicacion_controller_1.UbicacionController],
        providers: [contratos_service_1.ContratosService, ubicacion_service_1.UbicacionService, ubicacion_controller_1.UbicacionController],
        exports: [contratos_service_1.ContratosService]
    })
], ContratosModule);
//# sourceMappingURL=contratos.module.js.map