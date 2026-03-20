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
exports.NotificacionesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const notificaciones_service_1 = require("./notificaciones.service");
const personas_service_1 = require("../personas/personas.service");
const contratos_service_1 = require("../contratos/contratos.service");
const create_notificacione_dto_1 = require("./dto/create-notificacione.dto");
let NotificacionesController = class NotificacionesController {
    notificacionService;
    contratoService;
    personaService;
    constructor(notificacionService, contratoService, personaService) {
        this.notificacionService = notificacionService;
        this.contratoService = contratoService;
        this.personaService = personaService;
    }
    async notificarReemplazos(contratoId) {
        return this.notificacionService.notificaReemplazos(contratoId);
    }
    async notificarReemplazo(contratoId, personaId) {
        const contrato = await this.contratoService.getContrato(contratoId);
        const persona = await this.personaService.findOne(personaId);
        const dto = await this.notificacionService.generarNotificacion(create_notificacione_dto_1.TipoNotificacion.REEMPLAZO, contrato, persona);
        return this.notificacionService.enviar(dto);
    }
    async notificarCliente(contratoId, personaId) {
        const contrato = await this.contratoService.getContrato(contratoId);
        const persona = await this.personaService.findOne(personaId);
        const dto = await this.notificacionService.generarNotificacion(create_notificacione_dto_1.TipoNotificacion.CLIENTE, contrato, persona);
        return this.notificacionService.enviar(dto);
    }
    async notificarAdmin(contratoId, personaId) {
        const contrato = await this.contratoService.getContrato(contratoId);
        const persona = await this.personaService.findOne(personaId);
        const dto = await this.notificacionService.generarNotificacion(create_notificacione_dto_1.TipoNotificacion.ADMIN, contrato, persona);
        return this.notificacionService.enviar(dto);
    }
};
exports.NotificacionesController = NotificacionesController;
__decorate([
    (0, common_1.Post)('contratos/:contratoId/notificar-reemplazos'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('contratoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "notificarReemplazos", null);
__decorate([
    (0, common_1.Post)(':contratoId/reemplazo/:personaId'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('contratoId')),
    __param(1, (0, common_1.Param)('personaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "notificarReemplazo", null);
__decorate([
    (0, common_1.Post)(':contratoId/cliente/:personaId'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('contratoId')),
    __param(1, (0, common_1.Param)('personaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "notificarCliente", null);
__decorate([
    (0, common_1.Post)(':contratoId/admin/:personaId'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('contratoId')),
    __param(1, (0, common_1.Param)('personaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "notificarAdmin", null);
exports.NotificacionesController = NotificacionesController = __decorate([
    (0, common_1.Controller)('notificaciones'),
    __metadata("design:paramtypes", [notificaciones_service_1.NotificacionesService,
        contratos_service_1.ContratosService,
        personas_service_1.PersonasService])
], NotificacionesController);
//# sourceMappingURL=notificaciones.controller.js.map