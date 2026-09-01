import { ResponsePersonaDto } from "../../../admin/personas/dto/reponse-persona.dto";

export class ClientResponseDto {
  id: string;
  tipo_cliente: string;
  origen_registro: string;
  categoria: string;
  preferencia_contacto: string;
  estado: string;
  creado_en: Date;
  actualizado_en: Date;

  persona: ResponsePersonaDto | null;

  registrado_por?: {
    id: string;
    username: string;
    persona?: ResponsePersonaDto | null;
  } | null;
}