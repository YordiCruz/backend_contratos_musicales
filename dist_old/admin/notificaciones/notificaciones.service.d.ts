import { CreateNotificacioneDto, TipoNotificacion } from './dto/create-notificacione.dto';
import { Repository } from 'typeorm';
import { Notificacione } from './entities/notificacione.entity';
import { Persona } from '../personas/entities/persona.entity';
import { Contrato } from '../contratos/entities/contrato.entity';
import { ContratosService } from '../contratos/contratos.service';
import { TipoServicioEspecialidad } from '../contratos/entities/tipo-servicio-especialidad.entity';
import { IntegranteEspecialidad } from '../integrantes/entities/integrante-especialidad.entity';
import { ResumenContratoDTO } from '../contratos/dto/resumen-contrato.dto';
import { Reemplazo } from '../reemplazos/entities/reemplazo.entity';
export declare class NotificacionesService {
    private readonly notificacioneRepo;
    private readonly personaRepo;
    private readonly integranteEspecialidadRepo;
    private readonly tipoServicioEspecialidadRepo;
    private readonly contratoRepo;
    private readonly reemplazoRepo;
    private readonly contratoService;
    constructor(notificacioneRepo: Repository<Notificacione>, personaRepo: Repository<Persona>, integranteEspecialidadRepo: Repository<IntegranteEspecialidad>, tipoServicioEspecialidadRepo: Repository<TipoServicioEspecialidad>, contratoRepo: Repository<Contrato>, reemplazoRepo: Repository<Reemplazo>, contratoService: ContratosService);
    generarNotificacion(tipo: TipoNotificacion, contrato: Contrato, persona: Persona, mensaje?: string, resumen?: ResumenContratoDTO): Promise<CreateNotificacioneDto>;
    enviar(dto: CreateNotificacioneDto): Promise<{
        status: string;
        notificacion: Notificacione;
    }>;
    notificarIntegrantesPorServicio(contrato: Contrato): Promise<{
        status: string;
        total: number;
        notificaciones: {
            status: string;
            notificacion: Notificacione;
        }[];
    }>;
    notificaReemplazos(contratoId: string): Promise<{
        status: string;
        total: number;
        notificaciones: {
            status: string;
            notificacion: Notificacione;
        }[];
    }>;
    notificarReemplazoIndividual(contratoId: string, reemplazoId: string): Promise<{
        status: string;
        mensaje: string;
        notificacion: Notificacione;
    }>;
    notificarAdelanto(contratoId: string): Promise<{
        status: string;
        notificacion: Notificacione;
    } | {
        status: string;
        mensaje: string;
        notificacion: Notificacione;
    }>;
    findAll(): Promise<Notificacione[]>;
}
