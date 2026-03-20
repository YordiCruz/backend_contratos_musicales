import { Especialidad } from "../../especialidads/entities/especialidad.entity";
export declare class CategoriasEspecialidad {
    id: string;
    nombre: string;
    icono?: string;
    estado: string;
    creado_en: Date;
    actualizado_en: Date;
    eliminado_en: Date;
    especialidades: Especialidad[];
}
