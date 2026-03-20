import { Pago } from "src/admin/contratos/entities/pago.entity";
import { Evento } from "src/admin/eventos/eventos/entities/evento.entity";
import { Persona } from "src/admin/personas/entities/persona.entity";
import { Reemplazo } from "src/admin/reemplazos/entities/reemplazo.entity";
import { Role } from "src/admin/roles/entities/role.entity";
import { Client } from "src/client/clients/entities/client.entity";
export declare class User {
    id: string;
    email: string;
    password_hash: string;
    ultimo_login: Date;
    estado: string;
    origen_registro: string;
    roles: Role[];
    registrado_por: User;
    persona: Persona;
    clientes_registrados: Client[];
    reemplazos_registrados: Reemplazo[];
    eventos_registrados: Evento[];
    creado_en: Date;
    actualizado_en: Date;
    eliminado_en: Date | null;
    pagos: Pago[];
}
