import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { unlinkSync } from 'fs';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MediaService {

  constructor(
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>

  ) {}

   // Obtener todas las medias
  findAll() {
    return this.mediaRepo.find({ relations: ['evento'] });
  }


  // Obtener una media específica
  async findOne(id_media: string) {
    const media = await this.mediaRepo.findOne({ where: { id_media }, relations: ['evento'] });
    if (!media) throw new NotFoundException('Media no encontrada');
    return media;
  }

  // Actualizar datos de una media (ej. descripción, visibilidad, orden)
  async update(id_media: string, dto: UpdateMediaDto) {
    const media = await this.mediaRepo.findOne({ where: { id_media } });
    if (!media) throw new NotFoundException('Media no encontrada');

    this.mediaRepo.merge(media, {
      descripcion: dto.descripcion ?? media.descripcion,
      visibilidad_publica: dto.visibilidad_publica ?? media.visibilidad_publica,
      orden: dto.orden ?? media.orden,
    });

    return this.mediaRepo.save(media);
  }


 // Eliminar una media específica (hard delete: BD + archivo físico)
  async remove(id_media: string) {
    const media = await this.mediaRepo.findOne({ where: { id_media } });
    if (!media) throw new NotFoundException('Media no encontrada');

    // 1. Eliminar archivo físico
    try {
      unlinkSync(`.${media.url}`);
    } catch (e) {
      console.error('Error borrando archivo físico:', e.message);
    }

    // 2. Eliminar registro en BD
    await this.mediaRepo.delete(id_media);

    return { message: 'Media eliminada correctamente' };
  }

}
