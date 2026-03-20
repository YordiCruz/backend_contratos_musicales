"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const permission_entity_1 = require("../admin/permissions/entities/permission.entity");
const role_entity_1 = require("../admin/roles/entities/role.entity");
const user_entity_1 = require("../admin/users/entities/user.entity");
const roles_seeder_1 = require("./seeders/roles.seeder");
const permissions_seeder_1 = require("./seeders/permissions.seeder");
const categorias_especialidad_seeder_1 = require("./seeders/categorias-especialidad.seeder");
const especialidades_seeder_1 = require("./seeders/especialidades.seeder");
const categorias_especialidad_entity_1 = require("../admin/especialidades/categorias_especialidads/entities/categorias_especialidad.entity");
const especialidad_entity_1 = require("../admin/especialidades/especialidads/entities/especialidad.entity");
const tipo_servicio_especialidad_entity_1 = require("../admin/contratos/entities/tipo-servicio-especialidad.entity");
const tipo_servicio_especialidades_seeder_1 = require("./seeders/tipo-servicio-especialidades.seeder");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, role_entity_1.Role, permission_entity_1.Permission, especialidad_entity_1.Especialidad, categorias_especialidad_entity_1.CategoriasEspecialidad, tipo_servicio_especialidad_entity_1.TipoServicioEspecialidad]),],
        providers: [roles_seeder_1.RolesSeeder, permissions_seeder_1.PermissionsSeeder, categorias_especialidad_seeder_1.CategoriasEspecialidadSeeder, especialidades_seeder_1.EspecialidadesSeeder, tipo_servicio_especialidades_seeder_1.ServicioEspecialidadSeeder],
        exports: [roles_seeder_1.RolesSeeder, permissions_seeder_1.PermissionsSeeder, categorias_especialidad_seeder_1.CategoriasEspecialidadSeeder, especialidades_seeder_1.EspecialidadesSeeder, tipo_servicio_especialidades_seeder_1.ServicioEspecialidadSeeder],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map