import { CategoriasEspecialidad } from "../../categorias_especialidads/entities/categorias_especialidad.entity";
import { IntegranteEspecialidad } from "src/admin/integrantes/entities/integrante-especialidad.entity";
import { ReemplazoEspecialidad } from "src/admin/reemplazos/entities/reemplazo-especialidad.entity";
export declare class Especialidad {
    id: string;
    categoria: CategoriasEspecialidad;
    nombre: string;
    descripcion?: string;
    estado: string;
    creado_en: Date;
    actualizado_en: Date;
    eliminado_en: Date;
    integrantesAsignados: IntegranteEspecialidad[];
    reemplazosAsignados: ReemplazoEspecialidad[];
}
