import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';
import { Evento } from '../eventos/entities/evento.entity';
export declare class MediaService {
    private readonly mediaRepo;
    private readonly eventoRepo;
    constructor(mediaRepo: Repository<Media>, eventoRepo: Repository<Evento>);
    createMany(id_evento: string, files: Express.Multer.File[]): Promise<Media[]>;
    findByEvento(id_evento: string): Promise<{
        url: string;
        id_media: string;
        id_evento: string;
        evento: Evento;
        tipo: string;
        descripcion: string | null;
        orden?: number;
        visibilidad_publica: boolean;
        creado_en: Date;
        actualizado_en: Date;
        eliminado_en: Date;
    }[]>;
    findOne(id_media: string): Promise<Media>;
    changeVisibility(id_media: string, visible: boolean): Promise<Media>;
    remove(id_media: string): Promise<{
        message: string;
    } | undefined>;
}
