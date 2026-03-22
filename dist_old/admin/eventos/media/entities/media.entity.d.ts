import { Evento } from "../../eventos/entities/evento.entity";
export declare class Media {
    id_media: string;
    id_evento: string;
    evento: Evento;
    tipo: string;
    url: string;
    descripcion: string | null;
    orden?: number;
    visibilidad_publica: boolean;
    creado_en: Date;
    actualizado_en: Date;
    eliminado_en: Date;
}
