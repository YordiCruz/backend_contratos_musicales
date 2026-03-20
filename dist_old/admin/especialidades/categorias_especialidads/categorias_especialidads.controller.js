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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriasEspecialidadsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const categorias_especialidads_service_1 = require("./categorias_especialidads.service");
let CategoriasEspecialidadsController = class CategoriasEspecialidadsController {
    categoriasEspecialidadsService;
    constructor(categoriasEspecialidadsService) {
        this.categoriasEspecialidadsService = categoriasEspecialidadsService;
    }
    findAll() {
        return this.categoriasEspecialidadsService.findAll();
    }
};
exports.CategoriasEspecialidadsController = CategoriasEspecialidadsController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/categorias_especialidad.entity").CategoriasEspecialidad] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriasEspecialidadsController.prototype, "findAll", null);
exports.CategoriasEspecialidadsController = CategoriasEspecialidadsController = __decorate([
    (0, common_1.Controller)('categorias-especialidads'),
    __metadata("design:paramtypes", [categorias_especialidads_service_1.CategoriasEspecialidadsService])
], CategoriasEspecialidadsController);
//# sourceMappingURL=categorias_especialidads.controller.js.map