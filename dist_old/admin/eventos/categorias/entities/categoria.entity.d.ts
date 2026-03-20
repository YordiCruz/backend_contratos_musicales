import { Evento } from "../../eventos/entities/evento.entity";
export declare class Categoria {
    id_categoria: string;
    nombre: string;
    descripcion?: string;
    estado: string;
    eventos: Evento[];
    creado_por: string;
    actualizado_por: string;
    creado_en: Date;
    actualizado_en: Date;
    eliminado_en: Date;
}
