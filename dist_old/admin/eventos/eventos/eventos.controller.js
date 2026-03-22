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
exports.EventosController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const eventos_service_1 = require("./eventos.service");
const create_evento_dto_1 = require("./dto/create-evento.dto");
const update_evento_dto_1 = require("./dto/update-evento.dto");
let EventosController = class EventosController {
    eventosService;
    constructor(eventosService) {
        this.eventosService = eventosService;
    }
    create(dto) {
        return this.eventosService.create(dto);
    }
    changeEstado(id_evento, estado) {
        return this.eventosService.changeEstado(id_evento, estado);
    }
    findAll() {
        return this.eventosService.findAll();
    }
    findOne(id) {
        return this.eventosService.findOne(id);
    }
    update(id, dto) {
        dto.precio_base = Number(dto.precio_base);
        return this.eventosService.update(id, dto);
    }
    remove(id) {
        return this.eventosService.remove(id);
    }
};
exports.EventosController = EventosController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/evento.entity").Evento }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_evento_dto_1.CreateEventoDto]),
    __metadata("design:returntype", void 0)
], EventosController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id_evento/estado'),
    openapi.ApiResponse({ status: 200, type: require("./entities/evento.entity").Evento }),
    __param(0, (0, common_1.Param)('id_evento')),
    __param(1, (0, common_1.Body)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EventosController.prototype, "changeEstado", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/evento.entity").Evento] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/evento.entity").Evento }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_evento_dto_1.UpdateEventoDto]),
    __metadata("design:returntype", void 0)
], EventosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventosController.prototype, "remove", null);
exports.EventosController = EventosController = __decorate([
    (0, common_1.Controller)('eventos'),
    __metadata("design:paramtypes", [eventos_service_1.EventosService])
], EventosController);
//# sourceMappingURL=eventos.controller.js.map