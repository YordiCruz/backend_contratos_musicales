import { Integrante } from 'src/admin/integrantes/entities/integrante.entity';
import { Reemplazo } from 'src/admin/reemplazos/entities/reemplazo.entity';
import { User } from 'src/admin/users/entities/user.entity';
import { Client } from 'src/client/clients/entities/client.entity';
export declare class Persona {
    id: string;
    nombre: string;
    apellido: string;
    documento_identidad: string;
    email: string;
    telefono: string;
    estado: string;
    creado_en: Date;
    actualizado_en: Date;
    user: User;
    cliente: Client;
    integrante: Integrante;
    reemplazo: Reemplazo;
}
