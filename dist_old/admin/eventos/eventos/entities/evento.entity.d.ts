import { Categoria } from "../../categorias/entities/categoria.entity";
import { User } from "src/admin/users/entities/user.entity";
import { Media } from "../../media/entities/media.entity";
import { Contrato } from "src/admin/contratos/entities/contrato.entity";
export declare class Evento {
    id_evento: string;
    categoria: Categoria;
    nombre: string;
    descripcion?: string;
    estado: string;
    precio_base: number;
    descuento: number;
    contratos: Contrato[];
    creado_por: User;
    creado_en: Date;
    media: Media[];
}
