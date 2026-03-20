import { Contrato } from "src/admin/contratos/entities/contrato.entity";
import { Persona } from "src/admin/personas/entities/persona.entity";
import { User } from "src/admin/users/entities/user.entity";
export declare class Client {
    id: string;
    persona: Persona;
    tipo_cliente: string;
    origen_registro: string;
    categoria: string;
    preferencia_contacto: string;
    contratos: Contrato[];
    registrado_por: User;
    creado_en: Date;
    actualizado_en: Date;
    eliminado_en: Date | null;
    estado: string;
}
