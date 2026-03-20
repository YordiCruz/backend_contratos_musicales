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
exports.UbicacionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const ubicacion_service_1 = require("./ubicacion.service");
let UbicacionController = class UbicacionController {
    ubicacionesService;
    constructor(ubicacionesService) {
        this.ubicacionesService = ubicacionesService;
    }
    create(data) {
        return this.ubicacionesService.create(data);
    }
    findAll() {
        return this.ubicacionesService.findAll();
    }
    findOne(id) {
        return this.ubicacionesService.findOne(id);
    }
    update(id, data) {
        return this.ubicacionesService.update(id, data);
    }
    remove(id) {
        return this.ubicacionesService.remove(id);
    }
};
exports.UbicacionController = UbicacionController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/ubicacion.entity").Ubicacion }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UbicacionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/ubicacion.entity").Ubicacion] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UbicacionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/ubicacion.entity").Ubicacion }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UbicacionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/ubicacion.entity").Ubicacion }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UbicacionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/ubicacion.entity").Ubicacion }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UbicacionController.prototype, "remove", null);
exports.UbicacionController = UbicacionController = __decorate([
    (0, common_1.Controller)('ubicaciones'),
    __metadata("design:paramtypes", [ubicacion_service_1.UbicacionService])
], UbicacionController);
//# sourceMappingURL=ubicacion.controller.js.map