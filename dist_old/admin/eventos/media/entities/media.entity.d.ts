import { Evento } from "../../eventos/entities/evento.entity";
export declare class Media {
    id_media: string;
    evento: Evento;
    tipo: string;
    url: string;
    descripcion?: string;
    orden?: number;
    visibilidad_publica: boolean;
    creado_en: Date;
}
