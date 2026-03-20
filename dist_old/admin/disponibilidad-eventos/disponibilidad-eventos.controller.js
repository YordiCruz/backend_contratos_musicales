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
exports.DisponibilidadEventosController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const disponibilidad_eventos_service_1 = require("./disponibilidad-eventos.service");
let DisponibilidadEventosController = class DisponibilidadEventosController {
    disponibilidadService;
    constructor(disponibilidadService) {
        this.disponibilidadService = disponibilidadService;
    }
    async getDisponibilidadPorMes(año, mes) {
        return this.disponibilidadService.getDisponibilidadPorMes(año, mes);
    }
    async getDisponibilidadPorDia(fecha) {
        return this.disponibilidadService.getDisponibilidadPorDia(new Date(fecha));
    }
    async ocupar(data) {
        return this.disponibilidadService.marcarOcupado(new Date(data.fecha), data.bloque, data.contratoId);
    }
    async liberar(data) {
        return this.disponibilidadService.marcarLibre(new Date(data.fecha), data.bloque);
    }
};
exports.DisponibilidadEventosController = DisponibilidadEventosController;
__decorate([
    (0, common_1.Get)(':año/:mes'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/disponibilidad-evento.entity").DisponibilidadEvento] }),
    __param(0, (0, common_1.Param)('año')),
    __param(1, (0, common_1.Param)('mes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DisponibilidadEventosController.prototype, "getDisponibilidadPorMes", null);
__decorate([
    (0, common_1.Get)('dia/:fecha'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/disponibilidad-evento.entity").DisponibilidadEvento] }),
    __param(0, (0, common_1.Param)('fecha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisponibilidadEventosController.prototype, "getDisponibilidadPorDia", null);
__decorate([
    (0, common_1.Post)('ocupar'),
    openapi.ApiResponse({ status: 201, type: require("./entities/disponibilidad-evento.entity").DisponibilidadEvento }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DisponibilidadEventosController.prototype, "ocupar", null);
__decorate([
    (0, common_1.Post)('liberar'),
    openapi.ApiResponse({ status: 201, type: require("./entities/disponibilidad-evento.entity").DisponibilidadEvento }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DisponibilidadEventosController.prototype, "liberar", null);
exports.DisponibilidadEventosController = DisponibilidadEventosController = __decorate([
    (0, common_1.Controller)('disponibilidad'),
    __metadata("design:paramtypes", [disponibilidad_eventos_service_1.DisponibilidadEventosService])
], DisponibilidadEventosController);
//# sourceMappingURL=disponibilidad-eventos.controller.js.map