import { ContratoIntegrante } from "src/admin/contratos/entities/contrato-integrante.entity";
import { Persona } from "src/admin/personas/entities/persona.entity";
import { User } from "src/admin/users/entities/user.entity";
import { IntegranteEspecialidad } from "./integrante-especialidad.entity";
export declare class Integrante {
    id: string;
    id_persona: string;
    persona: Persona;
    tarifa_base_hora: number;
    moneda: string;
    fecha_ingreso: Date;
    estado: string;
    registrado_por: User;
    contratos: ContratoIntegrante[];
    creado_en: Date;
    actualizado_en: Date;
    eliminado_en: Date;
    especialidadesAsignadas: IntegranteEspecialidad[];
}
