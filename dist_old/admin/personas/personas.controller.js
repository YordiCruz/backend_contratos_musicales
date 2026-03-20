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
exports.PersonasController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const create_persona_dto_1 = require("./dto/create-persona.dto");
const personas_service_1 = require("./personas.service");
const update_persona_dto_1 = require("./dto/update-persona.dto");
const filtros_persona_dto_1 = require("./dto/filtros-persona.dto");
const admin_jwt_guard_1 = require("../../auth/admin-auth/guards/admin-jwt.guard");
let PersonasController = class PersonasController {
    personasService;
    constructor(personasService) {
        this.personasService = personasService;
    }
    create(createPersonaDto) {
        return this.personasService.create(createPersonaDto);
    }
    findAll(filters) {
        return this.personasService.findAll(filters);
    }
    findOne(id) {
        return this.personasService.findOne(id);
    }
    update(id, updatePersonaDto) {
        return this.personasService.update(id, updatePersonaDto);
    }
    remove(id) {
        return this.personasService.remove(id);
    }
};
exports.PersonasController = PersonasController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/persona.entity").Persona }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_persona_dto_1.CreatePersonaDto]),
    __metadata("design:returntype", void 0)
], PersonasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./dto/reponse-persona.dto").ResponsePersonaDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtros_persona_dto_1.FiltrosPersonaDto]),
    __metadata("design:returntype", void 0)
], PersonasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/persona.entity").Persona }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PersonasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/persona.entity").Persona }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_persona_dto_1.UpdatePersonaDto]),
    __metadata("design:returntype", void 0)
], PersonasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/persona.entity").Persona }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PersonasController.prototype, "remove", null);
exports.PersonasController = PersonasController = __decorate([
    (0, common_1.UseGuards)(admin_jwt_guard_1.AdminJwtGuard),
    (0, common_1.Controller)('personas'),
    __metadata("design:paramtypes", [personas_service_1.PersonasService])
], PersonasController);
//# sourceMappingURL=personas.controller.js.map