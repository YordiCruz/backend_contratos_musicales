import { NotificacionesService } from './notificaciones.service';
import { PersonasService } from '../personas/personas.service';
import { ContratosService } from '../contratos/contratos.service';
export declare class NotificacionesController {
    private readonly notificacionService;
    private readonly contratoService;
    private readonly personaService;
    constructor(notificacionService: NotificacionesService, contratoService: ContratosService, personaService: PersonasService);
    notificarReemplazos(contratoId: string): Promise<{
        status: string;
        total: number;
        notificaciones: {
            status: string;
            notificacion: import("./entities/notificacione.entity").Notificacione;
        }[];
    }>;
    notificarReemplazo(contratoId: string, personaId: string): Promise<{
        status: string;
        notificacion: import("./entities/notificacione.entity").Notificacione;
    }>;
    notificarCliente(contratoId: string, personaId: string): Promise<{
        status: string;
        notificacion: import("./entities/notificacione.entity").Notificacione;
    }>;
    notificarAdmin(contratoId: string, personaId: string): Promise<{
        status: string;
        notificacion: import("./entities/notificacione.entity").Notificacione;
    }>;
}
