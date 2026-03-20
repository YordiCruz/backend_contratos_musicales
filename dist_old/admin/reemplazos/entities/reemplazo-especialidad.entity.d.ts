import { Especialidad } from "src/admin/especialidades/especialidads/entities/especialidad.entity";
import { Reemplazo } from "./reemplazo.entity";
export declare class ReemplazoEspecialidad {
    id: string;
    reemplazo: Reemplazo;
    especialidad: Especialidad;
    tipo: string;
}
