import { Integrante } from "./integrante.entity";
import { Especialidad } from "src/admin/especialidades/especialidads/entities/especialidad.entity";
export declare class IntegranteEspecialidad {
    id: string;
    integrante: Integrante;
    especialidad: Especialidad;
    tipo: string;
}
