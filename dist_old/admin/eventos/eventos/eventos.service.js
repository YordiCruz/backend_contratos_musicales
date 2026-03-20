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
exports.EventosService = void 0;
const common_1 = require("@nestjs/common");
const categoria_entity_1 = require("../categorias/entities/categoria.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const evento_entity_1 = require("./entities/evento.entity");
const media_entity_1 = require("../media/entities/media.entity");
const fs_1 = require("fs");
let EventosService = class EventosService {
    categoriaRepo;
    repo;
    mediaRepo;
    dataSource;
    constructor(categoriaRepo, repo, mediaRepo, dataSource) {
        this.categoriaRepo = categoriaRepo;
        this.repo = repo;
        this.mediaRepo = mediaRepo;
        this.dataSource = dataSource;
    }
    async createEventoConMedia(dto, medias) {
        try {
            return await this.dataSource.transaction(async (manager) => {
                const categoria = await manager.findOne(categoria_entity_1.Categoria, {
                    where: { id_categoria: dto.id_categoria },
                });
                if (!categoria) {
                    throw new common_1.NotFoundException('Categoría no encontrada');
                }
                const existingEvento = await manager.findOne(evento_entity_1.Evento, {
                    where: { nombre: dto.nombre },
                });
                if (existingEvento) {
                    throw new Error(`Ya existe un evento con el nombre "${dto.nombre}"`);
                }
                const evento = manager.create(evento_entity_1.Evento, {
                    nombre: dto.nombre,
                    descripcion: dto.descripcion,
                    precio_base: dto.precio_base,
                    descuento: dto.descuento ?? 0,
                    categoria,
                });
                await manager.save(evento);
                if (medias && medias.length > 0) {
                    const mediaEntities = medias.map((m) => manager.create(media_entity_1.Media, {
                        tipo: m.tipo,
                        url: m.url,
                        descripcion: m.descripcion,
                        orden: m.orden,
                        visibilidad_publica: m.visibilidad_publica ?? true,
                        evento,
                    }));
                    await manager.save(mediaEntities);
                }
                return manager.findOne(evento_entity_1.Evento, {
                    where: { id_evento: evento.id_evento },
                    relations: ['categoria', 'media'],
                });
            });
        }
        catch (error) {
            throw new Error(`Error al crear evento con media: ${error.message}`);
        }
    }
    findAll() {
        return this.repo.find({ relations: ['categoria', 'media'] });
    }
    findOne(id) {
        return this.repo.findOne({
            where: { id_evento: id },
            relations: ['categoria', 'media'],
        });
    }
    async updateEventoConMedia(id_evento, dto, medias, replaceAll = true) {
        return this.dataSource.transaction(async (manager) => {
            const evento = await manager.findOne(evento_entity_1.Evento, {
                where: { id_evento },
                relations: ['media'],
            });
            if (!evento)
                throw new common_1.NotFoundException('Evento no encontrado');
            manager.merge(evento_entity_1.Evento, evento, {
                nombre: dto.nombre,
                descripcion: dto.descripcion,
                precio_base: Number(dto.precio_base),
                descuento: dto.descuento ? Number(dto.descuento) : 0,
            });
            await manager.save(evento);
            if (medias && medias.length > 0) {
                if (replaceAll) {
                    if (evento.media?.length) {
                        evento.media.forEach((m) => {
                            try {
                                (0, fs_1.unlinkSync)(`.${m.url}`);
                            }
                            catch (e) {
                                console.error('Error borrando archivo viejo:', e.message);
                            }
                        });
                    }
                    await manager.delete(media_entity_1.Media, { evento });
                    const nuevasMedias = medias.map((m) => manager.create(media_entity_1.Media, { ...m, evento }));
                    await manager.save(nuevasMedias);
                }
                else {
                    for (const nueva of medias) {
                        const existente = evento.media.find((m) => m.url === nueva.url);
                        if (!existente) {
                            const mediaEntity = manager.create(media_entity_1.Media, { ...nueva, evento });
                            await manager.save(mediaEntity);
                        }
                    }
                }
            }
            return manager.findOne(evento_entity_1.Evento, {
                where: { id_evento },
                relations: ['categoria', 'media'],
            });
        });
    }
    async remove(id_evento) {
        return this.dataSource.transaction(async (manager) => {
            const evento = await manager.findOne(evento_entity_1.Evento, {
                where: { id_evento },
                relations: ['media'],
            });
            if (!evento)
                throw new common_1.NotFoundException('Evento no encontrado');
            if (evento.media?.length) {
                evento.media.forEach((m) => {
                    try {
                        (0, fs_1.unlinkSync)(`.${m.url}`);
                    }
                    catch (e) {
                        console.error('Error borrando archivo:', e.message);
                    }
                });
            }
            await manager.delete(media_entity_1.Media, { evento });
            evento.estado = 'inactivo';
            await manager.save(evento);
            return {
                message: 'Evento eliminado (estado inactivo y archivos borrados)',
            };
        });
    }
};
exports.EventosService = EventosService;
exports.EventosService = EventosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(categoria_entity_1.Categoria)),
    __param(1, (0, typeorm_2.InjectRepository)(evento_entity_1.Evento)),
    __param(2, (0, typeorm_2.InjectRepository)(media_entity_1.Media)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.DataSource])
], EventosService);
//# sourceMappingURL=eventos.service.js.map