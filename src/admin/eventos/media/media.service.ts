import { Injectable, NotFoundException } from '@nestjs/common';
import { unlinkSync } from 'fs';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Evento } from '../eventos/entities/evento.entity';
import { join } from 'path';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,

    @InjectRepository(Evento)
    private readonly eventoRepo: Repository<Evento>,
  ) {}

  // ============================
  // CREAR VARIAS MEDIA PARA UN EVENTO
  // ============================
  async createMany(id_evento: string, files: Express.Multer.File[]) {
    const evento = await this.eventoRepo.findOne({
      where: { id_evento },
    });

    if (!evento) throw new NotFoundException('Evento no encontrado');

    const medias = files.map((file, index) =>
      this.mediaRepo.create({
        id_evento,
        tipo: file.mimetype.startsWith('video') ? 'video' : 'imagen',
        //url para que el frontend pueda visualizar el archivo
        url: `http://localhost:3070/uploads/${file.filename}`,
        descripcion: null,
        orden: index + 1,
        visibilidad_publica: true,
      }),
    );

    return this.mediaRepo.save(medias);
  }

  // ============================
  // LISTAR MEDIA DE UN EVENTO
  // ============================
// media.service.ts
async findByEvento(id_evento: string) {
  const medias = await this.mediaRepo.find({ where: { id_evento }, order: { orden: 'ASC' } });
  return medias.map(m => ({
    ...m,
    url: m.url.startsWith('http') ? m.url : `http://localhost:3070/uploads/${m.url}`
  }));
}
  // ============================
  // OBTENER UNA MEDIA
  // ============================
  async findOne(id_media: string) {
    const media = await this.mediaRepo.findOne({
      where: { id_media },
    });

    if (!media) throw new NotFoundException('Media no encontrada');

    return media;
  }

  // ============================
  // CAMBIAR VISIBILIDAD
  // ============================
  async changeVisibility(id_media: string, visible: boolean) {
    const media = await this.mediaRepo.findOne({ where: { id_media } });

    if (!media) throw new NotFoundException('Media no encontrada');

    media.visibilidad_publica = visible;

    return this.mediaRepo.save(media);
  }

  // ============================
  // ELIMINAR MEDIA (archivo + BD)
  // ============================
  async remove(id_media: string) {
    const media = await this.mediaRepo.findOne({ where: { id_media } });

    if (!media) throw new NotFoundException('Media no encontrada');

   const fileUrl = media.url;

if (fileUrl) {
  const filePath = join(__dirname, '..', 'uploads', fileUrl.split('/').pop()!);
  try {
    unlinkSync(filePath);
  } catch (e) {
    console.error('Error borrando archivo físico:', e.message);
  }

    await this.mediaRepo.delete(id_media);

    return { message: 'Media eliminada correctamente' };
  
}
  }
}