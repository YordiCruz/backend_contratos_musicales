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
exports.MediaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const media_service_1 = require("./media.service");
const platform_express_1 = require("@nestjs/platform-express");
const media_upload_config_1 = require("./media-upload-config");
let MediaController = class MediaController {
    mediaService;
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    uploadMedia(id_evento, files) {
        return this.mediaService.createMany(id_evento, files);
    }
    findByEvento(id_evento) {
        return this.mediaService.findByEvento(id_evento);
    }
    findOne(id_media) {
        return this.mediaService.findOne(id_media);
    }
    changeVisibility(id_media, visible) {
        return this.mediaService.changeVisibility(id_media, visible);
    }
    remove(id_media) {
        return this.mediaService.remove(id_media);
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Post)(':id_evento'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, media_upload_config_1.mediaUploadConfig)),
    openapi.ApiResponse({ status: 201, type: [require("./entities/media.entity").Media] }),
    __param(0, (0, common_1.Param)('id_evento')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "uploadMedia", null);
__decorate([
    (0, common_1.Get)('evento/:id_evento'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id_evento')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "findByEvento", null);
__decorate([
    (0, common_1.Get)(':id_media'),
    openapi.ApiResponse({ status: 200, type: require("./entities/media.entity").Media }),
    __param(0, (0, common_1.Param)('id_media')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('visibilidad/:id_media'),
    openapi.ApiResponse({ status: 200, type: require("./entities/media.entity").Media }),
    __param(0, (0, common_1.Param)('id_media')),
    __param(1, (0, common_1.Body)('visible')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "changeVisibility", null);
__decorate([
    (0, common_1.Delete)(':id_media'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id_media')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "remove", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
//# sourceMappingURL=media.controller.js.map