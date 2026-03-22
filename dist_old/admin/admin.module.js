"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const roles_module_1 = require("./roles/roles.module");
const permissions_module_1 = require("./permissions/permissions.module");
const personas_module_1 = require("./personas/personas.module");
const especialidades_module_1 = require("./especialidades/especialidades.module");
const reemplazos_module_1 = require("./reemplazos/reemplazos.module");
const integrantes_module_1 = require("./integrantes/integrantes.module");
const categorias_especialidads_module_1 = require("./especialidades/categorias_especialidads/categorias_especialidads.module");
const admin_auth_module_1 = require("../auth/admin-auth/admin-auth.module");
const users_controller_1 = require("./users/users.controller");
const roles_controller_1 = require("./roles/roles.controller");
const personas_controller_1 = require("./personas/personas.controller");
const reemplazos_controller_1 = require("./reemplazos/reemplazos.controller");
const integrantes_controller_1 = require("./integrantes/integrantes.controller");
const categorias_especialidads_controller_1 = require("./especialidades/categorias_especialidads/categorias_especialidads.controller");
const admin_auth_controller_1 = require("../auth/admin-auth/admin-auth.controller");
const especialidads_controller_1 = require("./especialidades/especialidads/especialidads.controller");
const eventos_module_1 = require("./eventos/eventos.module");
const disponibilidad_eventos_module_1 = require("./disponibilidad-eventos/disponibilidad-eventos.module");
const notificaciones_module_1 = require("./notificaciones/notificaciones.module");
const email_module_1 = require("./email/email.module");
const clients_module_1 = require("./clients/clients.module");
const clients_controller_1 = require("./clients/clients.controller");
const categorias_controller_1 = require("./eventos/categorias/categorias.controller");
const eventos_controller_1 = require("./eventos/eventos/eventos.controller");
const media_controller_1 = require("./eventos/media/media.controller");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            clients_module_1.ClientsModule,
            permissions_module_1.PermissionsModule,
            personas_module_1.PersonasModule,
            especialidades_module_1.EspecialidadesModule,
            reemplazos_module_1.ReemplazosModule,
            integrantes_module_1.IntegrantesModule,
            categorias_especialidads_module_1.CategoriasEspecialidadsModule,
            admin_auth_module_1.AdminAuthModule,
            eventos_module_1.EventosModule,
            disponibilidad_eventos_module_1.DisponibilidadEventosModule,
            notificaciones_module_1.NotificacionesModule,
            email_module_1.EmailModule
        ],
        controllers: [
            users_controller_1.UsersController,
            roles_controller_1.RolesController,
            clients_controller_1.ClientsController,
            personas_controller_1.PersonasController,
            reemplazos_controller_1.ReemplazosController,
            especialidads_controller_1.EspecialidadsController,
            integrantes_controller_1.IntegrantesController,
            categorias_especialidads_controller_1.CategoriasEspecialidadsController,
            admin_auth_controller_1.AdminAuthController,
            categorias_controller_1.CategoriasController,
            eventos_controller_1.EventosController,
            media_controller_1.MediaController
        ]
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map