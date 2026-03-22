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
const evento_entity_1 = require("../eventos/entities/evento.entity");
const path_1 = require("path");
let MediaService = class MediaService {
    mediaRepo;
    eventoRepo;
    constructor(mediaRepo, eventoRepo) {
        this.mediaRepo = mediaRepo;
        this.eventoRepo = eventoRepo;
    }
    async createMany(id_evento, files) {
        const evento = await this.eventoRepo.findOne({
            where: { id_evento },
        });
        if (!evento)
            throw new common_1.NotFoundException('Evento no encontrado');
        const medias = files.map((file, index) => this.mediaRepo.create({
            id_evento,
            tipo: file.mimetype.startsWith('video') ? 'video' : 'imagen',
            url: `http://localhost:3070/uploads/${file.filename}`,
            descripcion: null,
            orden: index + 1,
            visibilidad_publica: true,
        }));
        return this.mediaRepo.save(medias);
    }
    async findByEvento(id_evento) {
        const medias = await this.mediaRepo.find({ where: { id_evento }, order: { orden: 'ASC' } });
        return medias.map(m => ({
            ...m,
            url: m.url.startsWith('http') ? m.url : `http://localhost:3070/uploads/${m.url}`
        }));
    }
    async findOne(id_media) {
        const media = await this.mediaRepo.findOne({
            where: { id_media },
        });
        if (!media)
            throw new common_1.NotFoundException('Media no encontrada');
        return media;
    }
    async changeVisibility(id_media, visible) {
        const media = await this.mediaRepo.findOne({ where: { id_media } });
        if (!media)
            throw new common_1.NotFoundException('Media no encontrada');
        media.visibilidad_publica = visible;
        return this.mediaRepo.save(media);
    }
    async remove(id_media) {
        const media = await this.mediaRepo.findOne({ where: { id_media } });
        if (!media)
            throw new common_1.NotFoundException('Media no encontrada');
        const fileUrl = media.url;
        if (fileUrl) {
            const filePath = (0, path_1.join)(__dirname, '..', 'uploads', fileUrl.split('/').pop());
            try {
                (0, fs_1.unlinkSync)(filePath);
            }
            catch (e) {
                console.error('Error borrando archivo físico:', e.message);
            }
            await this.mediaRepo.delete(id_media);
            return { message: 'Media eliminada correctamente' };
        }
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(media_entity_1.Media)),
    __param(1, (0, typeorm_2.InjectRepository)(evento_entity_1.Evento)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], MediaService);
//# sourceMappingURL=media.service.js.map