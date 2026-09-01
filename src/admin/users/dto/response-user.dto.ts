import { ResponsePersonaDto } from "../../personas/dto/reponse-persona.dto";

export class ResponseUserDto {
    id: string;
    email: string;
    ultimo_login: Date;
    estado: string;
    origen_registro: string;
    persona: ResponsePersonaDto | null;
    solicitud_recuperacion: boolean;

}