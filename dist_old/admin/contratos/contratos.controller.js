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
exports.ContratosController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const contratos_service_1 = require("./contratos.service");
const create_contrato_dto_1 = require("./dto/create-contrato.dto");
const update_contrato_dto_1 = require("./dto/update-contrato.dto");
const contrato_reemplazo_entity_1 = require("./entities/contrato-reemplazo.entity");
const contrato_entity_1 = require("./entities/contrato.entity");
const asignar_integrante_dto_1 = require("./dto/asignar-integrante.dto");
const notificaciones_service_1 = require("../notificaciones/notificaciones.service");
const typeorm_1 = require("@nestjs/typeorm");
const tipo_servicio_especialidad_entity_1 = require("./entities/tipo-servicio-especialidad.entity");
const typeorm_2 = require("typeorm");
const contrato_integrante_entity_1 = require("./entities/contrato-integrante.entity");
const integrante_entity_1 = require("../integrantes/entities/integrante.entity");
const persona_entity_1 = require("../personas/entities/persona.entity");
let ContratosController = class ContratosController {
    contratosService;
    notificacionesService;
    contratoRepo;
    contratoReemplazoRepo;
    contratoIntegranteRepo;
    integranteRepo;
    personaRepo;
    tipoServicioEspecialidadRepo;
    constructor(contratosService, notificacionesService, contratoRepo, contratoReemplazoRepo, contratoIntegranteRepo, integranteRepo, personaRepo, tipoServicioEspecialidadRepo) {
        this.contratosService = contratosService;
        this.notificacionesService = notificacionesService;
        this.contratoRepo = contratoRepo;
        this.contratoReemplazoRepo = contratoReemplazoRepo;
        this.contratoIntegranteRepo = contratoIntegranteRepo;
        this.integranteRepo = integranteRepo;
        this.personaRepo = personaRepo;
        this.tipoServicioEspecialidadRepo = tipoServicioEspecialidadRepo;
    }
    create(createContratoDto) {
        return this.contratosService.createContrato(createContratoDto);
    }
    findOne(id) {
        return this.contratosService.getContrato(id);
    }
    async confirmarContrato(contratoId) {
        return this.contratosService.confirmarContrato(contratoId);
    }
    async rechazar(id) {
        const contrato = await this.contratosService.getContrato(id);
        contrato.estado = 'rechazado';
        return this.contratosService.updateContrato(id, contrato);
    }
    update(id, updateContratoDto) {
        return this.contratosService.updateContrato(id, updateContratoDto);
    }
    remove(id) {
        return this.contratosService.removeContrato(id);
    }
    async reabrirContrato(id) {
        return this.contratosService.reabrirContrato(id);
    }
    async rechazarContrato(id, motivo) {
        return this.contratosService.rechazarContrato(id, motivo);
    }
    async asignarIntegrantes(contratoId, dto) {
        if (!dto.integrantes || dto.integrantes.length === 0) {
            throw new common_1.NotFoundException('Debe especificar al menos un integrante');
        }
        for (const item of dto.integrantes) {
            await this.contratosService.asignarIntegranteAlContrato(contratoId, item);
        }
        return this.contratosService.obtenerContratoConIntegrantes(contratoId);
    }
    async asignarReemplazo(contratoId, data) {
        if (!data.id_reemplazo) {
            throw new common_1.NotFoundException('Debe especificar el id_reemplazo');
        }
        return this.contratosService.asignarReemplazoAlContrato({
            id_contrato: contratoId,
            id_reemplazo: data.id_reemplazo,
            id_especialidad: data.id_especialidad,
            horas_contratadas: data.horas_contratadas,
            aceptado: data.aceptado,
        });
    }
    async notificarPorServicio(contratoId) {
        const contrato = await this.contratosService.getContrato(contratoId);
        const result = await this.notificacionesService.notificarIntegrantesPorServicio(contrato);
        return result;
    }
    async aceptarInvitacion(contratoId, integranteId) {
        return this.contratosService.aceptarInvitacion(contratoId, integranteId);
    }
    async rechazarInvitacion(contratoId, integranteId) {
        return this.contratosService.rechazarInvitacion(contratoId, integranteId);
    }
    async aceptarInvitacionReemplazo(contratoId, reemplazoId) {
        return this.contratosService.aceptarInvitacionReemplazo(contratoId, reemplazoId);
    }
    async rechazarInvitacionReemplazo(contratoId, reemplazoId) {
        return this.contratosService.rechazarInvitacionReemplazo(contratoId, reemplazoId);
    }
    async resumenContrato(contratoId) {
        return this.contratosService.getResumenContrato(contratoId);
    }
    async notificarReemplazo(contratoId, reemplazoId) {
        return this.notificacionesService.notificarReemplazoIndividual(contratoId, reemplazoId);
    }
    async notificarAdelanto(id) {
        return this.notificacionesService.notificarAdelanto(id);
    }
};
exports.ContratosController = ContratosController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/contrato.entity").Contrato }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contrato_dto_1.CreateContratoDto]),
    __metadata("design:returntype", void 0)
], ContratosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/contrato.entity").Contrato }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContratosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/confirmar'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "confirmarContrato", null);
__decorate([
    (0, common_1.Patch)(':id/rechazar'),
    openapi.ApiResponse({ status: 200, type: require("./entities/contrato.entity").Contrato }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "rechazar", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/contrato.entity").Contrato }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contrato_dto_1.UpdateContratoDto]),
    __metadata("design:returntype", void 0)
], ContratosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/contrato.entity").Contrato }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContratosController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/reabrir'),
    openapi.ApiResponse({ status: 200, type: require("./entities/contrato.entity").Contrato }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "reabrirContrato", null);
__decorate([
    (0, common_1.Patch)(':id/rechazar'),
    openapi.ApiResponse({ status: 200, type: require("./entities/contrato.entity").Contrato }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('motivo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "rechazarContrato", null);
__decorate([
    (0, common_1.Post)(':id/integrantes'),
    openapi.ApiResponse({ status: 201, type: require("./entities/contrato.entity").Contrato }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, asignar_integrante_dto_1.AsignarIntegrantesDto]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "asignarIntegrantes", null);
__decorate([
    (0, common_1.Post)(':id/reemplazo'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "asignarReemplazo", null);
__decorate([
    (0, common_1.Post)(':contratoId/notificar-por-servicio'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('contratoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "notificarPorServicio", null);
__decorate([
    (0, common_1.Post)(':contratoId/invitaciones/:integranteId/aceptar'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('contratoId')),
    __param(1, (0, common_1.Param)('integranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "aceptarInvitacion", null);
__decorate([
    (0, common_1.Post)(':contratoId/invitaciones/:integranteId/rechazar'),
    openapi.ApiResponse({ status: 201, type: require("./entities/contrato-integrante.entity").ContratoIntegrante }),
    __param(0, (0, common_1.Param)('contratoId')),
    __param(1, (0, common_1.Param)('integranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "rechazarInvitacion", null);
__decorate([
    (0, common_1.Post)(':contratoId/invitacionesReemplazos/:reemplazoId/aceptar'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('contratoId')),
    __param(1, (0, common_1.Param)('reemplazoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "aceptarInvitacionReemplazo", null);
__decorate([
    (0, common_1.Post)(':contratoId/invitacionesReemplazos/:reemplazoId/rechazar'),
    openapi.ApiResponse({ status: 201, type: require("./entities/contrato-reemplazo.entity").ContratoReemplazo }),
    __param(0, (0, common_1.Param)('contratoId')),
    __param(1, (0, common_1.Param)('reemplazoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "rechazarInvitacionReemplazo", null);
__decorate([
    (0, common_1.Get)(':contratoId/resumen'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('contratoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "resumenContrato", null);
__decorate([
    (0, common_1.Post)(':contratoId/notificar-reemplazo/:reemplazoId'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('contratoId')),
    __param(1, (0, common_1.Param)('reemplazoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "notificarReemplazo", null);
__decorate([
    (0, common_1.Post)(':id/notificar-adelanto'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "notificarAdelanto", null);
exports.ContratosController = ContratosController = __decorate([
    (0, common_1.Controller)('contratos'),
    __param(2, (0, typeorm_1.InjectRepository)(contrato_entity_1.Contrato)),
    __param(3, (0, typeorm_1.InjectRepository)(contrato_reemplazo_entity_1.ContratoReemplazo)),
    __param(4, (0, typeorm_1.InjectRepository)(contrato_integrante_entity_1.ContratoIntegrante)),
    __param(5, (0, typeorm_1.InjectRepository)(integrante_entity_1.Integrante)),
    __param(6, (0, typeorm_1.InjectRepository)(persona_entity_1.Persona)),
    __param(7, (0, typeorm_1.InjectRepository)(tipo_servicio_especialidad_entity_1.TipoServicioEspecialidad)),
    __metadata("design:paramtypes", [contratos_service_1.ContratosService,
        notificaciones_service_1.NotificacionesService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ContratosController);
//# sourceMappingURL=contratos.controller.js.map