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
exports.ReemplazosController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const reemplazos_service_1 = require("./reemplazos.service");
const create_reemplazo_dto_1 = require("./dto/create-reemplazo.dto");
const update_reemplazo_dto_1 = require("./dto/update-reemplazo.dto");
const filtros_reemplazo_dto_1 = require("./dto/filtros-reemplazo.dto");
const asignar_especialidad_dto_1 = require("./dto/asignar-especialidad.dto");
const asignar_varias_especialidades_dto_1 = require("./dto/asignar-varias-especialidades.dto");
const admin_jwt_guard_1 = require("../../auth/admin-auth/guards/admin-jwt.guard");
let ReemplazosController = class ReemplazosController {
    reemplazosService;
    constructor(reemplazosService) {
        this.reemplazosService = reemplazosService;
    }
    create(req, createReemplazoDto) {
        return this.reemplazosService.create(createReemplazoDto, req.user);
    }
    findAll(filters) {
        return this.reemplazosService.findAll(filters);
    }
    findOne(id) {
        return this.reemplazosService.findOne(id);
    }
    update(id, updateReemplazoDto) {
        return this.reemplazosService.update(id, updateReemplazoDto);
    }
    remove(id) {
        return this.reemplazosService.remove(id);
    }
    createReemplazFromExistingPersona(idPersona, req, dto) {
        return this.reemplazosService.createReemplazoFromExistingPersona(idPersona, dto, req.user);
    }
    listEspecialidades(id) {
        return this.reemplazosService.listaEspecialidades(id);
    }
    asignarEspecialidad(id, dto) {
        return this.reemplazosService.asignarEspecialidad(id, dto);
    }
    asignarMultiples(id, dto) {
        return this.reemplazosService.asignarMultiplesEspecialidades(id, dto);
    }
    eliminarEspecialidad(id, idEspecialidad) {
        return this.reemplazosService.eliminarEspecialidad(id, idEspecialidad);
    }
};
exports.ReemplazosController = ReemplazosController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/reemplazo.entity").Reemplazo }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_reemplazo_dto_1.CreateReemplazoDto]),
    __metadata("design:returntype", void 0)
], ReemplazosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./dto/response-reemplazo.dto").ResponseReemplazoDto] }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtros_reemplazo_dto_1.FiltrosReemplazoDto]),
    __metadata("design:returntype", void 0)
], ReemplazosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/reemplazo.entity").Reemplazo }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReemplazosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/response-update-reemplazo.dto").ResponseUpdateReemplazoDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_reemplazo_dto_1.UpdateReemplazoDto]),
    __metadata("design:returntype", void 0)
], ReemplazosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReemplazosController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('reemplazos/from-persona/:idPersona'),
    openapi.ApiResponse({ status: 201, type: require("./entities/reemplazo.entity").Reemplazo }),
    __param(0, (0, common_1.Param)('idPersona')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ReemplazosController.prototype, "createReemplazFromExistingPersona", null);
__decorate([
    (0, common_1.Get)(':id/especialidades'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReemplazosController.prototype, "listEspecialidades", null);
__decorate([
    (0, common_1.Post)(':id/especialidades'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, asignar_especialidad_dto_1.AsignarEspecialidadDto]),
    __metadata("design:returntype", void 0)
], ReemplazosController.prototype, "asignarEspecialidad", null);
__decorate([
    (0, common_1.Post)(':id/especialidades/multiples'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, asignar_varias_especialidades_dto_1.AsignarVariasEspecialidadesDto]),
    __metadata("design:returntype", void 0)
], ReemplazosController.prototype, "asignarMultiples", null);
__decorate([
    (0, common_1.Delete)(':id/especialidades/:idEspecialidad'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('idEspecialidad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ReemplazosController.prototype, "eliminarEspecialidad", null);
exports.ReemplazosController = ReemplazosController = __decorate([
    (0, common_1.UseGuards)(admin_jwt_guard_1.AdminJwtGuard),
    (0, common_1.Controller)('reemplazos'),
    __metadata("design:paramtypes", [reemplazos_service_1.ReemplazosService])
], ReemplazosController);
//# sourceMappingURL=reemplazos.controller.js.map