import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { ContratoReemplazo } from './entities/contrato-reemplazo.entity';
import { Contrato } from './entities/contrato.entity';
import { AsignarIntegrantesDto } from './dto/asignar-integrante.dto';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { TipoServicioEspecialidad } from './entities/tipo-servicio-especialidad.entity';
import { Repository } from 'typeorm';
import { ContratoIntegrante } from './entities/contrato-integrante.entity';
import { Integrante } from '../integrantes/entities/integrante.entity';
import { ResumenContratoDTO } from './dto/resumen-contrato.dto';
import { Persona } from '../personas/entities/persona.entity';
export declare class ContratosController {
    private readonly contratosService;
    private readonly notificacionesService;
    private contratoRepo;
    private contratoReemplazoRepo;
    private contratoIntegranteRepo;
    private integranteRepo;
    private personaRepo;
    private readonly tipoServicioEspecialidadRepo;
    constructor(contratosService: ContratosService, notificacionesService: NotificacionesService, contratoRepo: Repository<Contrato>, contratoReemplazoRepo: Repository<ContratoReemplazo>, contratoIntegranteRepo: Repository<ContratoIntegrante>, integranteRepo: Repository<Integrante>, personaRepo: Repository<Persona>, tipoServicioEspecialidadRepo: Repository<TipoServicioEspecialidad>);
    create(createContratoDto: CreateContratoDto): Promise<Contrato>;
    findOne(id: string): Promise<Contrato>;
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
    rechazar(id: string): Promise<Contrato>;
    update(id: string, updateContratoDto: UpdateContratoDto): Promise<Contrato>;
    remove(id: string): Promise<Contrato>;
    reabrirContrato(id: string): Promise<Contrato>;
    rechazarContrato(id: string, motivo?: string): Promise<Contrato>;
    asignarIntegrantes(contratoId: string, dto: AsignarIntegrantesDto): Promise<Contrato>;
    asignarReemplazo(contratoId: string, data: {
        id_reemplazo: string;
        id_especialidad: string;
        horas_contratadas?: number;
        aceptado?: boolean;
    }): Promise<ContratoReemplazo | any>;
    notificarPorServicio(contratoId: string): Promise<{
        status: string;
        total: number;
        notificaciones: {
            status: string;
            notificacion: import("../notificaciones/entities/notificacione.entity").Notificacione;
        }[];
    }>;
    aceptarInvitacion(contratoId: string, integranteId: string): Promise<ResumenContratoDTO>;
    rechazarInvitacion(contratoId: string, integranteId: string): Promise<ContratoIntegrante>;
    aceptarInvitacionReemplazo(contratoId: string, reemplazoId: string): Promise<ResumenContratoDTO>;
    rechazarInvitacionReemplazo(contratoId: string, reemplazoId: string): Promise<ContratoReemplazo>;
    resumenContrato(contratoId: string): Promise<ResumenContratoDTO>;
    notificarReemplazo(contratoId: string, reemplazoId: string): Promise<{
        status: string;
        mensaje: string;
        notificacion: import("../notificaciones/entities/notificacione.entity").Notificacione;
    }>;
    notificarAdelanto(id: string): Promise<{
        status: string;
        notificacion: import("../notificaciones/entities/notificacione.entity").Notificacione;
    } | {
        status: string;
        mensaje: string;
        notificacion: import("../notificaciones/entities/notificacione.entity").Notificacione;
    }>;
}
