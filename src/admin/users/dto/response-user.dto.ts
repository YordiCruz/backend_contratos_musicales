import { ResponsePersonaDto } from "src/admin/personas/dto/reponse-persona.dto";

export class ResponseUserDto {
    id: string;
    username: string;
    ultimo_login: Date;
    estado: string;
    origen_registro: string;
    persona: ResponsePersonaDto | null;

}