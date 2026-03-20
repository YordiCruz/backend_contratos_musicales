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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const media_entity_1 = require("./entities/media.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let MediaService = class MediaService {
    mediaRepo;
    constructor(mediaRepo) {
        this.mediaRepo = mediaRepo;
    }
    findAll() {
        return this.mediaRepo.find({ relations: ['evento'] });
    }
    async findOne(id_media) {
        const media = await this.mediaRepo.findOne({ where: { id_media }, relations: ['evento'] });
        if (!media)
            throw new common_1.NotFoundException('Media no encontrada');
        return media;
    }
    async update(id_media, dto) {
        const media = await this.mediaRepo.findOne({ where: { id_media } });
        if (!media)
            throw new common_1.NotFoundException('Media no encontrada');
        this.mediaRepo.merge(media, {
            descripcion: dto.descripcion ?? media.descripcion,
            visibilidad_publica: dto.visibilidad_publica ?? media.visibilidad_publica,
            orden: dto.orden ?? media.orden,
        });
        return this.mediaRepo.save(media);
    }
    async remove(id_media) {
        const media = await this.mediaRepo.findOne({ where: { id_media } });
        if (!media)
            throw new common_1.NotFoundException('Media no encontrada');
        try {
            (0, fs_1.unlinkSync)(`.${media.url}`);
        }
        catch (e) {
            console.error('Error borrando archivo físico:', e.message);
        }
        await this.mediaRepo.delete(id_media);
        return { message: 'Media eliminada correctamente' };
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(media_entity_1.Media)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], MediaService);
//# sourceMappingURL=media.service.js.map