import { ContratoReemplazo } from "src/admin/contratos/entities/contrato-reemplazo.entity";
import { Persona } from "src/admin/personas/entities/persona.entity";
import { User } from "src/admin/users/entities/user.entity";
import { ReemplazoEspecialidad } from "./reemplazo-especialidad.entity";
export declare class Reemplazo {
    id: string;
    persona: Persona;
    tarifa_base_hora: number;
    moneda: string;
    estado: string;
    disponible: boolean;
    contratos: ContratoReemplazo[];
    registrado_por: User;
    creado_en: Date;
    actualizado_en: Date;
    eliminado_en: Date;
    especialidadesAsignadas: ReemplazoEspecialidad[];
}
