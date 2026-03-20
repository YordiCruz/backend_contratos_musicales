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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrantesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const integrantes_service_1 = require("./integrantes.service");
const create_integrante_dto_1 = require("./dto/create-integrante.dto");
const update_integrante_dto_1 = require("./dto/update-integrante.dto");
const filtro_integrante_data_dto_1 = require("./dto/filtro-integrante-data.dto");
const asignar_especialidad_dto_1 = require("./dto/asignar-especialidad.dto");
const asignar_varias_especialidades_dto_1 = require("./dto/asignar-varias-especialidades.dto");
const admin_jwt_guard_1 = require("../../auth/admin-auth/guards/admin-jwt.guard");
const swagger_1 = require("@nestjs/swagger");
let IntegrantesController = class IntegrantesController {
    integrantesService;
    constructor(integrantesService) {
        this.integrantesService = integrantesService;
    }
    create(req, createIntegranteDto) {
        return this.integrantesService.create(createIntegranteDto, req.user);
    }
    findAll(filters) {
        return this.integrantesService.findAll(filters);
    }
    findOne(id) {
        return this.integrantesService.findOne(id);
    }
    update(id, updateIntegranteDto) {
        return this.integrantesService.update(id, updateIntegranteDto);
    }
    remove(id) {
        return this.integrantesService.remove(id);
    }
    createIntegranteFromExistingPersona(idPersona, req, dto) {
        return this.integrantesService.createIntegranteFromExistingPersona(idPersona, dto, req.user);
    }
    listEspecialidades(id) {
        return this.integrantesService.listaEspecialidades(id);
    }
    asignarEspecialidad(id, dto) {
        return this.integrantesService.asignarEspecialidad(id, dto);
    }
    asignarMultiples(id, dto) {
        return this.integrantesService.asignarMultiplesEspecialidades(id, dto);
    }
    eliminarEspecialidad(id, idEspecialidad) {
        return this.integrantesService.eliminarEspecialidad(id, idEspecialidad);
    }
};
exports.IntegrantesController = IntegrantesController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/integrante.entity").Integrante }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_integrante_dto_1.CreateIntegranteDto]),
    __metadata("design:returntype", void 0)
], IntegrantesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./dto/response-integrante.dto").ResponseIntegranteDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtro_integrante_data_dto_1.FiltroIntegranteDataDto]),
    __metadata("design:returntype", void 0)
], IntegrantesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/integrante.entity").Integrante }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IntegrantesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/response-update.dto").ResponseUpdateDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_integrante_dto_1.UpdateIntegranteDto]),
    __metadata("design:returntype", void 0)
], IntegrantesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IntegrantesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('integrantes/from-persona/:idPersona'),
    openapi.ApiResponse({ status: 201, type: require("./entities/integrante.entity").Integrante }),
    __param(0, (0, common_1.Param)('idPersona')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], IntegrantesController.prototype, "createIntegranteFromExistingPersona", null);
__decorate([
    (0, common_1.Get)(':id/especialidades'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IntegrantesController.prototype, "listEspecialidades", null);
__decorate([
    (0, common_1.Post)(':id/especialidades'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, asignar_especialidad_dto_1.AsignarEspecialidadDto]),
    __metadata("design:returntype", void 0)
], IntegrantesController.prototype, "asignarEspecialidad", null);
__decorate([
    (0, common_1.Post)(':id/especialidades/multiples'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, asignar_varias_especialidades_dto_1.AsignarVariasEspecialidadesDto]),
    __metadata("design:returntype", void 0)
], IntegrantesController.prototype, "asignarMultiples", null);
__decorate([
    (0, common_1.Delete)(':id/especialidades/:idEspecialidad'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('idEspecialidad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], IntegrantesController.prototype, "eliminarEspecialidad", null);
exports.IntegrantesController = IntegrantesController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(admin_jwt_guard_1.AdminJwtGuard),
    (0, common_1.Controller)('integrantes'),
    __metadata("design:paramtypes", [integrantes_service_1.IntegrantesService])
], IntegrantesController);
//# sourceMappingURL=integrantes.controller.js.map