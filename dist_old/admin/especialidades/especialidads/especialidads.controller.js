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
exports.EspecialidadsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const especialidads_service_1 = require("./especialidads.service");
const create_especialidad_dto_1 = require("./dto/create-especialidad.dto");
const update_especialidad_dto_1 = require("./dto/update-especialidad.dto");
const filtros_especialidad_dto_1 = require("./dto/filtros-especialidad.dto");
const admin_jwt_guard_1 = require("../../../auth/admin-auth/guards/admin-jwt.guard");
let EspecialidadsController = class EspecialidadsController {
    especialidadsService;
    constructor(especialidadsService) {
        this.especialidadsService = especialidadsService;
    }
    create(createEspecialidadDto) {
        return this.especialidadsService.create(createEspecialidadDto);
    }
    findAll(filters) {
        return this.especialidadsService.findAll(filters);
    }
    findOne(id) {
        return this.especialidadsService.findOne(id);
    }
    update(id, updateEspecialidadDto) {
        return this.especialidadsService.update(id, updateEspecialidadDto);
    }
    remove(id) {
        return this.especialidadsService.remove(id);
    }
};
exports.EspecialidadsController = EspecialidadsController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/especialidad.entity").Especialidad }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_especialidad_dto_1.CreateEspecialidadDto]),
    __metadata("design:returntype", void 0)
], EspecialidadsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./dto/response-especialidad.dto").ResponseEspecialidadDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtros_especialidad_dto_1.FiltrosEspecialidadDto]),
    __metadata("design:returntype", void 0)
], EspecialidadsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/response-especialidad.dto").ResponseEspecialidadDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EspecialidadsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/especialidad.entity").Especialidad }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_especialidad_dto_1.UpdateEspecialidadDto]),
    __metadata("design:returntype", void 0)
], EspecialidadsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EspecialidadsController.prototype, "remove", null);
exports.EspecialidadsController = EspecialidadsController = __decorate([
    (0, common_1.UseGuards)(admin_jwt_guard_1.AdminJwtGuard),
    (0, common_1.Controller)('especialidades'),
    __metadata("design:paramtypes", [especialidads_service_1.EspecialidadsService])
], EspecialidadsController);
//# sourceMappingURL=especialidads.controller.js.map