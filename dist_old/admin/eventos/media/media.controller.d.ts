import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    uploadMedia(id_evento: string, files: Express.Multer.File[]): Promise<import("./entities/media.entity").Media[]>;
    findByEvento(id_evento: string): Promise<{
        url: string;
        id_media: string;
        id_evento: string;
        evento: import("../eventos/entities/evento.entity").Evento;
        tipo: string;
        descripcion: string | null;
        orden?: number;
        visibilidad_publica: boolean;
        creado_en: Date;
        actualizado_en: Date;
        eliminado_en: Date;
    }[]>;
    findOne(id_media: string): Promise<import("./entities/media.entity").Media>;
    changeVisibility(id_media: string, visible: boolean): Promise<import("./entities/media.entity").Media>;
    remove(id_media: string): Promise<{
        message: string;
    } | undefined>;
}
