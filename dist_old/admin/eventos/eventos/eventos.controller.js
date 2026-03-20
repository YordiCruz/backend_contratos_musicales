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
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("multer");
let EventosController = class EventosController {
    eventosService;
    constructor(eventosService) {
        this.eventosService = eventosService;
    }
    async uploadEvento(dto, files) {
        if (!files || files.length === 0) {
            throw new Error('No se ha proporcionado ningún archivo');
        }
        const medias = files.map((file, index) => ({
            tipo: file.mimetype.startsWith('video') ? 'video' : 'imagen',
            url: `/uploads/${file.filename}`,
            descripcion: 'Archivo subido',
            orden: index + 1,
            visibilidad_publica: true,
        }));
        return this.eventosService.createEventoConMedia(dto, medias);
    }
    findAll() {
        return this.eventosService.findAll();
    }
    findOne(id) {
        return this.eventosService.findOne(id);
    }
    async updateEvento(id, dto, files) {
        dto.precio_base = Number(dto.precio_base);
        dto.descuento = dto.descuento ? Number(dto.descuento) : 0;
        let medias;
        if (files && files.length > 0) {
            medias = files.map((file, index) => ({
                tipo: file.mimetype.startsWith('video') ? 'video' : 'imagen',
                url: `/uploads/${file.filename}`,
                descripcion: 'Archivo actualizado',
                orden: index + 1,
                visibilidad_publica: true,
            }));
        }
        return this.eventosService.updateEventoConMedia(id, dto, medias);
    }
    remove(id) {
        return this.eventosService.remove(id);
    }
};
exports.EventosController = EventosController;
__decorate([
    (0, common_1.Post)('upload-evento'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, file.fieldname + '-' + uniqueSuffix + (0, path_1.extname)(file.originalname));
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png|gif|mp4)$/)) {
                cb(null, true);
            }
            else {
                cb(new Error('Solo se permiten imágenes o videos'), false);
            }
        },
    })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_evento_dto_1.CreateEventoDto, Array]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "uploadEvento", null);
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, file.fieldname + '-' + uniqueSuffix + (0, path_1.extname)(file.originalname));
            },
        }),
    })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_evento_dto_1.UpdateEventoDto, Array]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "updateEvento", null);
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