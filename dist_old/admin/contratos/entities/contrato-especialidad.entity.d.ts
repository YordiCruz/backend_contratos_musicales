import { Contrato } from "./contrato.entity";
import { Especialidad } from "src/admin/especialidades/especialidads/entities/especialidad.entity";
export declare class ContratoEspecialidad {
    id: string;
    contrato: Contrato;
    especialidad: Especialidad;
    tipo_asignacion: 'primario' | 'secundario' | null;
    requerido: boolean;
}
