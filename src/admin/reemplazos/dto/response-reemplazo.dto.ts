import { ResponsePersonaDto } from "src/admin/personas/dto/reponse-persona.dto"

export class ResponseReemplazoDto {
    id: string
    tarifa_base_hora: number
    moneda: string
    estado: string
    disponible: boolean
    creado_en: Date
    actualizado_en: Date
    eliminado_en: Date
    persona: ResponsePersonaDto | null;
    registrado_por?: {
        id: string;
        username: string;
        persona?: ResponsePersonaDto | null;
    }
}