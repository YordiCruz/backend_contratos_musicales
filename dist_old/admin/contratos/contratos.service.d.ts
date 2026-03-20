import { Repository, DataSource } from 'typeorm';
import { Contrato } from './entities/contrato.entity';
import { ContratoIntegrante } from './entities/contrato-integrante.entity';
import { ContratoReemplazo } from './entities/contrato-reemplazo.entity';
import { DisponibilidadEvento } from '../disponibilidad-eventos/entities/disponibilidad-evento.entity';
import { Ubicacion } from './entities/ubicacion.entity';
import { Integrante } from '../integrantes/entities/integrante.entity';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { Reemplazo } from '../reemplazos/entities/reemplazo.entity';
import { TipoServicioEspecialidad } from './entities/tipo-servicio-especialidad.entity';
import { AsignarIntegranteDto } from './dto/asignar-integrante.dto';
import { Persona } from '../personas/entities/persona.entity';
import { User } from '../users/entities/user.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { ResumenContratoDTO } from './dto/resumen-contrato.dto';
import { Notificacione } from '../notificaciones/entities/notificacione.entity';
export declare class ContratosService {
    private contratoRepo;
    private readonly tipoServicioEspecialidadRepo;
    private readonly integranteRepo;
    private contratoIntegranteRepo;
    private contratoReemplazoRepo;
    private disponibilidadRepo;
    private personaRepo;
    private notificacioneRepo;
    private reemplazoRepo;
    private userRepo;
    private readonly notificacionesService;
    private ubicacionRepo;
    private dataSource;
    constructor(contratoRepo: Repository<Contrato>, tipoServicioEspecialidadRepo: Repository<TipoServicioEspecialidad>, integranteRepo: Repository<Integrante>, contratoIntegranteRepo: Repository<ContratoIntegrante>, contratoReemplazoRepo: Repository<ContratoReemplazo>, disponibilidadRepo: Repository<DisponibilidadEvento>, personaRepo: Repository<Persona>, notificacioneRepo: Repository<Notificacione>, reemplazoRepo: Repository<Reemplazo>, userRepo: Repository<User>, notificacionesService: NotificacionesService, ubicacionRepo: Repository<Ubicacion>, dataSource: DataSource);
    createContrato(data: CreateContratoDto): Promise<Contrato>;
    getContrato(id: string): Promise<Contrato>;
    confirmarContrato(contratoId: string): Promise<{
        estado: string;
        mensaje: string;
        cobertura?: undefined;
        faltantes?: undefined;
        posibles_reemplazos?: undefined;
    } | {
        estado: string;
        cobertura: {
            especialidad: string;
            estado: string;
            tipo: string;
            nombre: string;
        }[];
        faltantes: {
            especialidad: string;
            estado: string;
        }[];
        posibles_reemplazos: {};
        mensaje: string;
    } | {
        estado: string;
        cobertura: {
            especialidad: string;
            estado: string;
            tipo: string;
            nombre: string;
        }[];
        mensaje: string;
        faltantes?: undefined;
        posibles_reemplazos?: undefined;
    }>;
    reabrirContrato(id: string): Promise<Contrato>;
    rechazarContrato(id: string, motivo?: string): Promise<Contrato>;
    aceptarInvitacion(contratoId: string, personaId: string): Promise<ResumenContratoDTO>;
    rechazarInvitacion(contratoId: string, personaId: string): Promise<ContratoIntegrante>;
    aceptarInvitacionReemplazo(contratoId: string, personaId: string): Promise<ResumenContratoDTO>;
    rechazarInvitacionReemplazo(contratoId: string, personaId: string): Promise<ContratoReemplazo>;
    asignarIntegranteAlContrato(contratoId: string, dto: AsignarIntegranteDto): Promise<Contrato>;
    asignarReemplazoAlContrato(data: {
        id_contrato: string;
        id_reemplazo: string;
        id_especialidad: string;
        horas_contratadas?: number;
        aceptado?: boolean;
    }): Promise<Contrato | null>;
    obtenerContratoConIntegrantes(id_contrato: string): Promise<Contrato>;
    updateContrato(id: string, data: Partial<Contrato>): Promise<Contrato>;
    removeContrato(id: string): Promise<Contrato>;
    getResumenContrato(contratoId: string): Promise<ResumenContratoDTO>;
}
