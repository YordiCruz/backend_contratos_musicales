import { Contrato } from "src/admin/contratos/entities/contrato.entity";
import { Persona } from "src/admin/personas/entities/persona.entity";
export declare class Notificacione {
    id: string;
    tipo: string;
    mensaje: string;
    fecha: Date;
    persona: Persona;
    contrato: Contrato;
    estado: 'pendiente' | 'aceptado' | 'rechazado';
}
