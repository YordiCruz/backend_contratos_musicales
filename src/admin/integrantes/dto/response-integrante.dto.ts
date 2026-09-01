import { ResponsePersonaDto } from "../../personas/dto/reponse-persona.dto";

export class ResponseIntegranteDto {

    tarifa_base_hora: number;
    moneda: string;
    fecha_ingreso: Date;
    estado: string;
    creado_en: Date;
    actualizado_en: Date;
    eliminado_en: Date;

    persona: ResponsePersonaDto | null;
    
    registrado_por?: {
        id: string;
        username: string;
        persona?: ResponsePersonaDto | null;
    } | null;
}