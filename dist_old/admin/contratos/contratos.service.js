"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContratosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contrato_entity_1 = require("./entities/contrato.entity");
const contrato_integrante_entity_1 = require("./entities/contrato-integrante.entity");
const contrato_reemplazo_entity_1 = require("./entities/contrato-reemplazo.entity");
const disponibilidad_evento_entity_1 = require("../disponibilidad-eventos/entities/disponibilidad-evento.entity");
const ubicacion_entity_1 = require("./entities/ubicacion.entity");
const integrante_entity_1 = require("../integrantes/entities/integrante.entity");
const client_entity_1 = require("../../client/clients/entities/client.entity");
const evento_entity_1 = require("../eventos/eventos/entities/evento.entity");
const reemplazo_entity_1 = require("../reemplazos/entities/reemplazo.entity");
const pago_entity_1 = require("./entities/pago.entity");
const tipo_servicio_especialidad_entity_1 = require("./entities/tipo-servicio-especialidad.entity");
const persona_entity_1 = require("../personas/entities/persona.entity");
const user_entity_1 = require("../users/entities/user.entity");
const create_notificacione_dto_1 = require("../notificaciones/dto/create-notificacione.dto");
const notificaciones_service_1 = require("../notificaciones/notificaciones.service");
const notificacione_entity_1 = require("../notificaciones/entities/notificacione.entity");
let ContratosService = class ContratosService {
    contratoRepo;
    tipoServicioEspecialidadRepo;
    integranteRepo;
    contratoIntegranteRepo;
    contratoReemplazoRepo;
    disponibilidadRepo;
    personaRepo;
    notificacioneRepo;
    reemplazoRepo;
    userRepo;
    notificacionesService;
    ubicacionRepo;
    dataSource;
    constructor(contratoRepo, tipoServicioEspecialidadRepo, integranteRepo, contratoIntegranteRepo, contratoReemplazoRepo, disponibilidadRepo, personaRepo, notificacioneRepo, reemplazoRepo, userRepo, notificacionesService, ubicacionRepo, dataSource) {
        this.contratoRepo = contratoRepo;
        this.tipoServicioEspecialidadRepo = tipoServicioEspecialidadRepo;
        this.integranteRepo = integranteRepo;
        this.contratoIntegranteRepo = contratoIntegranteRepo;
        this.contratoReemplazoRepo = contratoReemplazoRepo;
        this.disponibilidadRepo = disponibilidadRepo;
        this.personaRepo = personaRepo;
        this.notificacioneRepo = notificacioneRepo;
        this.reemplazoRepo = reemplazoRepo;
        this.userRepo = userRepo;
        this.notificacionesService = notificacionesService;
        this.ubicacionRepo = ubicacionRepo;
        this.dataSource = dataSource;
    }
    async createContrato(data) {
        const disponibilidad = await this.disponibilidadRepo.findOne({
            where: { fecha: data.fecha_evento, bloque: data.bloque },
        });
        if (disponibilidad && disponibilidad.estado === 'ocupado') {
            throw new common_1.BadRequestException('La fecha y bloque ya están ocupados');
        }
        const cliente = await this.dataSource
            .getRepository(client_entity_1.Client)
            .findOne({ where: { id: data.id_cliente } });
        if (!cliente)
            throw new common_1.NotFoundException('Cliente no encontrado');
        const evento = await this.dataSource
            .getRepository(evento_entity_1.Evento)
            .findOne({ where: { id_evento: data.id_evento } });
        if (!evento)
            throw new common_1.NotFoundException('Evento no encontrado');
        const ubicacion = await this.ubicacionRepo.findOne({
            where: { id_ubicacion: data.id_ubicacion },
        });
        if (!ubicacion)
            throw new common_1.NotFoundException('Ubicación no encontrada');
        const contrato = this.contratoRepo.create({
            cliente,
            evento,
            ubicacion,
            fecha_evento: data.fecha_evento,
            bloque: data.bloque,
            hora_inicio: data.hora_inicio,
            hora_fin: data.hora_fin,
            tipo_servicio: data.tipo_servicio,
            horas_contratadas: data.horas_contratadas,
            adelanto: data.adelanto,
            saldo: data.saldo,
            fecha_adelanto: data.fecha_adelanto,
            estado: 'pendiente',
        });
        await this.contratoRepo.save(contrato);
        const admins = await this.userRepo
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.roles', 'role')
            .leftJoinAndSelect('user.persona', 'persona')
            .where('LOWER(role.nombre) = LOWER(:rol)', { rol: 'ADMIN' })
            .getMany();
        for (const admin of admins) {
            if (!admin.persona)
                continue;
            const notifDto = await this.notificacionesService.generarNotificacion(create_notificacione_dto_1.TipoNotificacion.ADMIN, contrato, admin.persona);
            await this.notificacionesService.enviar(notifDto);
        }
        return contrato;
    }
    async getContrato(id) {
        const contrato = await this.contratoRepo.findOne({
            where: { id_contrato: id },
            relations: [
                'cliente',
                'evento',
                'ubicacion',
                'integrantes',
                'integrantes.integrante',
                'integrantes.integrante.persona',
                'reemplazos',
                'reemplazos.reemplazo',
                'reemplazos.reemplazo.persona',
                'pagos',
            ],
        });
        if (!contrato)
            throw new common_1.NotFoundException('Contrato no encontrado');
        return contrato;
    }
    async confirmarContrato(contratoId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const contrato = await queryRunner.manager.findOne(contrato_entity_1.Contrato, {
                where: { id_contrato: contratoId },
                relations: ['ubicacion', 'evento', 'cliente', 'cliente.persona'],
            });
            if (!contrato)
                throw new common_1.NotFoundException('Contrato no encontrado');
            const disponibilidad = await queryRunner.manager.findOne(disponibilidad_evento_entity_1.DisponibilidadEvento, {
                where: { fecha: contrato.fecha_evento, bloque: contrato.bloque },
            });
            if (disponibilidad?.estado === 'ocupado') {
                await queryRunner.rollbackTransaction();
                return { estado: 'pendiente', mensaje: 'Fecha y bloque ocupados' };
            }
            const especialidadesRequeridas = await queryRunner.manager.find(tipo_servicio_especialidad_entity_1.TipoServicioEspecialidad, {
                where: { tipo_servicio: contrato.tipo_servicio },
                relations: ['especialidad'],
            });
            const contratoIntegrantes = await queryRunner.manager.find(contrato_integrante_entity_1.ContratoIntegrante, {
                where: { contrato: { id_contrato: contratoId }, estado: 'aceptado' },
                relations: ['integrante', 'integrante.persona'],
            });
            const contratoReemplazos = await queryRunner.manager.find(contrato_reemplazo_entity_1.ContratoReemplazo, {
                where: { contrato: { id_contrato: contratoId }, estado: 'aceptado' },
                relations: ['reemplazo', 'reemplazo.persona'],
            });
            let faltantes = [];
            let cobertura = [];
            for (const esp of especialidadesRequeridas) {
                const nombreEsp = esp.especialidad.nombre.toLowerCase();
                let cubierta = false;
                const integrante = contratoIntegrantes.find((ci) => ci.especialidad.toLowerCase() === nombreEsp);
                if (integrante) {
                    cubierta = true;
                    cobertura.push({
                        especialidad: esp.especialidad.nombre,
                        estado: 'cubierta',
                        tipo: 'integrante',
                        nombre: integrante.integrante?.persona
                            ? `${integrante.integrante.persona.nombre} ${integrante.integrante.persona.apellido}`
                            : 'Persona no encontrada',
                    });
                    continue;
                }
                const reemplazo = contratoReemplazos.find((cr) => cr.especialidad.toLowerCase() === nombreEsp);
                if (reemplazo) {
                    cubierta = true;
                    cobertura.push({
                        especialidad: esp.especialidad.nombre,
                        estado: 'cubierta',
                        tipo: 'reemplazo',
                        nombre: reemplazo.reemplazo?.persona
                            ? `${reemplazo.reemplazo.persona.nombre} ${reemplazo.reemplazo.persona.apellido}`
                            : 'Persona no encontrada',
                    });
                    continue;
                }
                if (!cubierta) {
                    faltantes.push({
                        especialidad: esp.especialidad.nombre,
                        estado: 'faltante',
                    });
                }
            }
            if (faltantes.length > 0) {
                const posiblesReemplazos = {};
                for (const f of faltantes) {
                    const candidatos = await queryRunner.manager.find(reemplazo_entity_1.Reemplazo, {
                        where: { estado: 'activo', disponible: true },
                        relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad', 'persona'],
                    });
                    posiblesReemplazos[f.especialidad] = candidatos
                        .filter((r) => (r.especialidadesAsignadas ?? []).some((e) => e.especialidad.nombre.toLowerCase() === f.especialidad.toLowerCase()))
                        .map((r) => ({
                        id_reemplazo: r.id,
                        nombre: `${r.persona.nombre} ${r.persona.apellido}`,
                        especialidad: f.especialidad,
                        tarifa_base_hora: r.tarifa_base_hora,
                        moneda: r.moneda,
                    }));
                }
                await queryRunner.rollbackTransaction();
                return {
                    estado: 'pendiente',
                    cobertura,
                    faltantes,
                    posibles_reemplazos: posiblesReemplazos,
                    mensaje: 'Contrato pendiente: faltan especialidades críticas por cubrir',
                };
            }
            const pagoAdelanto = await queryRunner.manager.findOne(pago_entity_1.Pago, {
                where: { contrato: { id_contrato: contratoId }, tipo: 'adelanto' },
            });
            if (!pagoAdelanto) {
                await queryRunner.rollbackTransaction();
                return { estado: 'pendiente', mensaje: 'Contrato pendiente: falta pago de adelanto' };
            }
            if (!contrato.admin_aprobacion) {
                await queryRunner.rollbackTransaction();
                return { estado: 'pendiente', mensaje: 'Contrato pendiente: falta aprobación del administrador' };
            }
            contrato.estado = 'confirmado';
            await queryRunner.manager.save(contrato);
            const slot = disponibilidad ??
                queryRunner.manager.create(disponibilidad_evento_entity_1.DisponibilidadEvento, {
                    fecha: contrato.fecha_evento,
                    bloque: contrato.bloque,
                });
            slot.estado = 'ocupado';
            slot.contrato = contrato;
            await queryRunner.manager.save(slot);
            await queryRunner.commitTransaction();
            return {
                estado: contrato.estado,
                cobertura,
                mensaje: 'Contrato confirmado: todas las especialidades están cubiertas',
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async reabrirContrato(id) {
        const contrato = await this.contratoRepo.findOne({
            where: { id_contrato: id },
        });
        if (!contrato)
            throw new common_1.NotFoundException('Contrato no encontrado');
        if (contrato.estado !== 'rechazado' && contrato.estado !== 'cancelado') {
            throw new common_1.BadRequestException('Solo se pueden reabrir contratos rechazados o cancelados');
        }
        contrato.estado = 'pendiente';
        return this.contratoRepo.save(contrato);
    }
    async rechazarContrato(id, motivo) {
        const contrato = await this.contratoRepo.findOne({
            where: { id_contrato: id },
        });
        if (!contrato)
            throw new common_1.NotFoundException('Contrato no encontrado');
        contrato.estado = 'rechazado';
        contrato.motivo_cancelacion = motivo ?? 'No especificado';
        return this.contratoRepo.save(contrato);
    }
    async aceptarInvitacion(contratoId, personaId) {
        const contrato = await this.contratoRepo.findOne({ where: { id_contrato: contratoId } });
        const integrante = await this.integranteRepo.findOne({
            where: { persona: { id: personaId } },
            relations: ['persona', 'especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
        });
        if (!contrato || !integrante) {
            throw new Error('Contrato o integrante no encontrado');
        }
        const especialidadPrimaria = integrante.especialidadesAsignadas.find(e => e.tipo === 'primario');
        const horasContratadas = contrato.horas_contratadas;
        const sueldoBase = integrante.tarifa_base_hora;
        const compensacionHora = horasContratadas * sueldoBase;
        let registro = await this.contratoIntegranteRepo.findOne({
            where: { id_contrato: contratoId, id_integrante: integrante.id },
        });
        if (!registro) {
            registro = this.contratoIntegranteRepo.create({
                id_contrato: contratoId,
                id_integrante: integrante.id,
                especialidad: especialidadPrimaria?.especialidad.nombre ?? 'N/A',
                compensacion_hora: compensacionHora,
                horas_contratadas: horasContratadas,
                estado: 'aceptado',
            });
        }
        else {
            registro.estado = 'aceptado';
            registro.especialidad = especialidadPrimaria?.especialidad.nombre ?? registro.especialidad;
            registro.compensacion_hora = compensacionHora;
            registro.horas_contratadas = horasContratadas;
        }
        await this.contratoIntegranteRepo.save(registro);
        const notificacion = await this.notificacioneRepo.findOne({
            where: { contrato: { id_contrato: contratoId }, persona: { id: personaId } },
        });
        if (notificacion) {
            notificacion.estado = 'aceptado';
            await this.notificacioneRepo.save(notificacion);
        }
        const resumen = await this.getResumenContrato(contratoId);
        const notificacionAdmin = await this.notificacionesService.generarNotificacion(create_notificacione_dto_1.TipoNotificacion.ADMIN_RESUMEN, contrato, integrante.persona, undefined, resumen);
        await this.notificacioneRepo.save(this.notificacioneRepo.create(notificacionAdmin));
        return resumen;
    }
    async rechazarInvitacion(contratoId, personaId) {
        const contrato = await this.contratoRepo.findOne({ where: { id_contrato: contratoId } });
        const integrante = await this.integranteRepo.findOne({
            where: { persona: { id: personaId } },
            relations: ['persona', 'especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
        });
        if (!contrato || !integrante) {
            throw new Error('Contrato o integrante no encontrado');
        }
        const especialidadPrimaria = integrante.especialidadesAsignadas.find(e => e.tipo === 'primario');
        const horasContratadas = contrato.horas_contratadas;
        const sueldoBase = integrante.tarifa_base_hora;
        const compensacionHora = horasContratadas * sueldoBase;
        let registro = await this.contratoIntegranteRepo.findOne({
            where: { id_contrato: contratoId, id_integrante: integrante.id },
        });
        if (!registro) {
            registro = this.contratoIntegranteRepo.create({
                id_contrato: contratoId,
                id_integrante: integrante.id,
                especialidad: especialidadPrimaria?.especialidad.nombre ?? 'N/A',
                compensacion_hora: compensacionHora,
                horas_contratadas: horasContratadas,
                estado: 'rechazado',
            });
        }
        else {
            registro.estado = 'rechazado';
            registro.especialidad = especialidadPrimaria?.especialidad.nombre ?? registro.especialidad;
            registro.compensacion_hora = compensacionHora;
            registro.horas_contratadas = horasContratadas;
        }
        await this.contratoIntegranteRepo.save(registro);
        const notificacion = await this.notificacioneRepo.findOne({
            where: { contrato: { id_contrato: contratoId }, persona: { id: personaId } },
        });
        if (notificacion) {
            notificacion.estado = 'rechazado';
            await this.notificacioneRepo.save(notificacion);
        }
        return registro;
    }
    async aceptarInvitacionReemplazo(contratoId, personaId) {
        const contrato = await this.contratoRepo.findOne({ where: { id_contrato: contratoId } });
        const reemplazo = await this.reemplazoRepo.findOne({
            where: { persona: { id: personaId } },
            relations: ['persona', 'especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
        });
        if (!contrato || !reemplazo) {
            throw new Error('Contrato o reemplazo no encontrado');
        }
        const especialidadPrimaria = reemplazo.especialidadesAsignadas.find(e => e.tipo === 'primario');
        const horasContratadas = contrato.horas_contratadas;
        const sueldoBase = reemplazo.tarifa_base_hora;
        const compensacionHora = horasContratadas * sueldoBase;
        let registro = await this.contratoReemplazoRepo.findOne({
            where: { id_contrato: contratoId, id_reemplazo: reemplazo.id },
        });
        if (!registro) {
            registro = this.contratoReemplazoRepo.create({
                id_contrato: contratoId,
                id_reemplazo: reemplazo.id,
                especialidad: especialidadPrimaria?.especialidad.nombre ?? 'N/A',
                compensacion_hora: compensacionHora,
                horas_contratadas: horasContratadas,
                estado: 'aceptado',
            });
        }
        else {
            registro.estado = 'aceptado';
            registro.especialidad = especialidadPrimaria?.especialidad.nombre ?? registro.especialidad;
            registro.compensacion_hora = compensacionHora;
            registro.horas_contratadas = horasContratadas;
        }
        await this.contratoReemplazoRepo.save(registro);
        const notificacion = await this.notificacioneRepo.findOne({
            where: { contrato: { id_contrato: contratoId }, persona: { id: personaId } },
        });
        if (notificacion) {
            notificacion.estado = 'aceptado';
            await this.notificacioneRepo.save(notificacion);
        }
        const resumen = await this.getResumenContrato(contratoId);
        const notificacionAdmin = await this.notificacionesService.generarNotificacion(create_notificacione_dto_1.TipoNotificacion.ADMIN_RESUMEN, contrato, reemplazo.persona, undefined, resumen);
        await this.notificacioneRepo.save(this.notificacioneRepo.create(notificacionAdmin));
        return resumen;
    }
    async rechazarInvitacionReemplazo(contratoId, personaId) {
        const contrato = await this.contratoRepo.findOne({ where: { id_contrato: contratoId } });
        const reemplazo = await this.reemplazoRepo.findOne({
            where: { persona: { id: personaId } },
            relations: ['persona', 'especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
        });
        if (!contrato || !reemplazo) {
            throw new Error('Contrato o reemplazo no encontrado');
        }
        const especialidadPrimaria = reemplazo.especialidadesAsignadas.find(e => e.tipo === 'primario');
        const horasContratadas = contrato.horas_contratadas;
        const sueldoBase = reemplazo.tarifa_base_hora;
        const compensacionHora = horasContratadas * sueldoBase;
        let registro = await this.contratoReemplazoRepo.findOne({
            where: { id_contrato: contratoId, id_reemplazo: reemplazo.id },
        });
        if (!registro) {
            registro = this.contratoReemplazoRepo.create({
                id_contrato: contratoId,
                id_reemplazo: reemplazo.id,
                especialidad: especialidadPrimaria?.especialidad.nombre ?? 'N/A',
                compensacion_hora: compensacionHora,
                horas_contratadas: horasContratadas,
                estado: 'rechazado',
            });
        }
        else {
            registro.estado = 'rechazado';
            registro.especialidad = especialidadPrimaria?.especialidad.nombre ?? registro.especialidad;
            registro.compensacion_hora = compensacionHora;
            registro.horas_contratadas = horasContratadas;
        }
        await this.contratoReemplazoRepo.save(registro);
        const notificacion = await this.notificacioneRepo.findOne({
            where: { contrato: { id_contrato: contratoId }, persona: { id: personaId } },
        });
        if (notificacion) {
            notificacion.estado = 'rechazado';
            await this.notificacioneRepo.save(notificacion);
        }
        return registro;
    }
    async asignarIntegranteAlContrato(contratoId, dto) {
        const contrato = await this.contratoRepo.findOne({
            where: { id_contrato: contratoId },
            relations: ['integrantes'],
        });
        if (!contrato)
            throw new common_1.NotFoundException('Contrato no encontrado');
        const integranteEntity = await this.dataSource.getRepository(integrante_entity_1.Integrante).findOne({
            where: { id: dto.id_integrante },
            relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad', 'persona'],
        });
        if (!integranteEntity)
            throw new common_1.NotFoundException('Integrante no encontrado');
        const especialidadAsignada = integranteEntity.especialidadesAsignadas.find((e) => e.tipo === 'primario');
        if (!especialidadAsignada) {
            throw new common_1.BadRequestException('El integrante no tiene especialidad primaria asignada');
        }
        const especialidadesRequeridas = await this.dataSource.getRepository(tipo_servicio_especialidad_entity_1.TipoServicioEspecialidad).find({
            where: { tipo_servicio: contrato.tipo_servicio },
            relations: ['especialidad'],
        });
        const especialidadValida = especialidadesRequeridas.some((esp) => esp.especialidad.id === especialidadAsignada.especialidad.id);
        if (!especialidadValida) {
            throw new common_1.BadRequestException(`La especialidad primaria ${especialidadAsignada.especialidad.nombre} no corresponde al tipo de servicio ${contrato.tipo_servicio}`);
        }
        const contratoIntegrante = this.contratoIntegranteRepo.create({
            id_contrato: contrato.id_contrato,
            id_integrante: integranteEntity.id,
            contrato,
            integrante: integranteEntity,
            especialidad: especialidadAsignada.especialidad.nombre,
            compensacion_hora: (integranteEntity?.tarifa_base_hora ?? 0) *
                (dto.horas_contratadas ?? contrato.horas_contratadas),
            horas_contratadas: dto.horas_contratadas ?? contrato.horas_contratadas,
            estado: dto.aceptado ? 'aceptado' : 'pendiente',
        });
        await this.contratoIntegranteRepo.save(contratoIntegrante);
        const contratoActualizado = await this.contratoRepo.findOne({
            where: { id_contrato: contratoId },
            relations: ['integrantes', 'integrantes.integrante', 'integrantes.integrante.persona'],
        });
        if (!contratoActualizado) {
            throw new common_1.NotFoundException('Contrato no encontrado después de asignar integrante');
        }
        return contratoActualizado;
    }
    async asignarReemplazoAlContrato(data) {
        const contrato = await this.contratoRepo.findOne({
            where: { id_contrato: data.id_contrato },
            relations: ['reemplazos'],
        });
        if (!contrato)
            throw new common_1.NotFoundException('Contrato no encontrado');
        if (contrato.estado !== 'confirmado') {
            throw new common_1.BadRequestException('Solo se pueden asignar reemplazos a contratos confirmados');
        }
        const reemplazoEntity = await this.dataSource
            .getRepository(reemplazo_entity_1.Reemplazo)
            .findOne({
            where: { id: data.id_reemplazo },
            relations: [
                'especialidadesAsignadas',
                'especialidadesAsignadas.especialidad',
                'persona',
            ],
        });
        if (!reemplazoEntity)
            throw new common_1.NotFoundException('Reemplazo no encontrado');
        if (!reemplazoEntity.disponible) {
            throw new common_1.BadRequestException('El reemplazo no está disponible actualmente');
        }
        const especialidadAsignada = reemplazoEntity.especialidadesAsignadas.find((e) => e.especialidad.id === data.id_especialidad);
        if (!especialidadAsignada) {
            throw new common_1.BadRequestException('El reemplazo no tiene la especialidad indicada');
        }
        const contratoReemplazo = this.contratoReemplazoRepo.create({
            id_contrato: contrato.id_contrato,
            id_reemplazo: reemplazoEntity.id,
            contrato,
            reemplazo: reemplazoEntity,
            especialidad: especialidadAsignada.especialidad.nombre,
            compensacion_hora: (reemplazoEntity?.tarifa_base_hora ?? 0) *
                (data.horas_contratadas ?? contrato.horas_contratadas),
            horas_contratadas: data.horas_contratadas ?? contrato.horas_contratadas,
            estado: data.aceptado ? 'aceptado' : 'pendiente',
        });
        await this.contratoReemplazoRepo.save(contratoReemplazo);
        return this.contratoRepo.findOne({
            where: { id_contrato: data.id_contrato },
            relations: [
                'reemplazos',
                'reemplazos.reemplazo',
                'reemplazos.reemplazo.persona',
            ],
        });
    }
    async obtenerContratoConIntegrantes(id_contrato) {
        const contrato = await this.contratoRepo.findOne({
            where: { id_contrato },
            relations: [
                'integrantes',
                'integrantes.integrante',
                'integrantes.integrante.persona',
            ],
        });
        if (!contrato) {
            throw new common_1.NotFoundException('Contrato no encontrado');
        }
        return contrato;
    }
    async updateContrato(id, data) {
        const contrato = await this.contratoRepo.findOne({
            where: { id_contrato: id },
        });
        if (!contrato)
            throw new common_1.NotFoundException('Contrato no encontrado');
        Object.assign(contrato, data);
        return this.contratoRepo.save(contrato);
    }
    async removeContrato(id) {
        const contrato = await this.contratoRepo.findOne({
            where: { id_contrato: id },
        });
        if (!contrato)
            throw new common_1.NotFoundException('Contrato no encontrado');
        return this.contratoRepo.remove(contrato);
    }
    async getResumenContrato(contratoId) {
        const contrato = await this.contratoRepo.findOne({
            where: { id_contrato: contratoId },
        });
        if (!contrato)
            throw new Error('Contrato no encontrado');
        const invitaciones = await this.contratoIntegranteRepo.find({
            where: { id_contrato: contratoId },
            relations: ['integrante', 'integrante.persona'],
        });
        const aceptados = invitaciones
            .filter(i => i.estado === 'aceptado')
            .map(i => ({
            nombre: i.integrante.persona.nombre,
            especialidad: i.especialidad,
            estado: 'aceptado',
        }));
        const rechazados = invitaciones
            .filter(i => i.estado === 'rechazado')
            .map(i => ({
            nombre: i.integrante.persona.nombre,
            especialidad: i.especialidad,
            estado: 'rechazado',
        }));
        const notificacionesPendientes = await this.notificacioneRepo.find({
            where: { contrato: { id_contrato: contratoId }, estado: 'pendiente' },
            relations: ['persona'],
        });
        const pendientes = [];
        for (const n of notificacionesPendientes) {
            const integrante = await this.integranteRepo.findOne({
                where: { persona: { id: n.persona.id } },
                relations: ['persona', 'especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
            });
            if (integrante) {
                const especialidadPrimaria = integrante.especialidadesAsignadas.find(e => e.tipo === 'primario');
                const esRequerida = await this.tipoServicioEspecialidadRepo.findOne({
                    where: { tipo_servicio: contrato.tipo_servicio, especialidad: { id: especialidadPrimaria?.especialidad.id }, requerido: true },
                });
                if (especialidadPrimaria && esRequerida) {
                    pendientes.push({
                        nombre: integrante.persona.nombre,
                        especialidad: especialidadPrimaria.especialidad.nombre,
                        estado: 'pendiente',
                    });
                }
                else {
                    pendientes.push({
                        nombre: integrante.persona.nombre,
                        especialidad: 'N/A',
                        estado: 'pendiente',
                    });
                }
            }
        }
        const requeridas = await this.tipoServicioEspecialidadRepo.find({
            where: { tipo_servicio: contrato.tipo_servicio, requerido: true },
            relations: ['especialidad'],
        });
        const faltantes = requeridas.filter(req => {
            const aceptado = aceptados.some(a => a.especialidad === req.especialidad.nombre);
            const rechazado = rechazados.some(r => r.especialidad === req.especialidad.nombre);
            return !aceptado && rechazado;
        });
        const sugerencias = [];
        for (const f of faltantes) {
            const candidatos = await this.reemplazoRepo.find({
                relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad', 'persona'],
            });
            const filtrados = candidatos
                .filter(c => c.especialidadesAsignadas.some(e => e.especialidad.id === f.especialidad.id))
                .map(c => {
                const esp = c.especialidadesAsignadas.find(e => e.especialidad.id === f.especialidad.id);
                const tipo = esp?.tipo === 'primario' ? 'primario' : 'secundario';
                return {
                    id: c.id,
                    nombre: c.persona.nombre,
                    tipo: tipo,
                };
            })
                .sort((a, b) => (a.tipo === 'primario' ? -1 : 1));
            sugerencias.push({ especialidad: f.especialidad.nombre, candidatos: filtrados });
        }
        return {
            contratoId,
            aceptados,
            rechazados,
            pendientes,
            faltantes: faltantes.map(f => f.especialidad.nombre),
            sugerencias,
        };
    }
};
exports.ContratosService = ContratosService;
exports.ContratosService = ContratosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contrato_entity_1.Contrato)),
    __param(1, (0, typeorm_1.InjectRepository)(tipo_servicio_especialidad_entity_1.TipoServicioEspecialidad)),
    __param(2, (0, typeorm_1.InjectRepository)(integrante_entity_1.Integrante)),
    __param(3, (0, typeorm_1.InjectRepository)(contrato_integrante_entity_1.ContratoIntegrante)),
    __param(4, (0, typeorm_1.InjectRepository)(contrato_reemplazo_entity_1.ContratoReemplazo)),
    __param(5, (0, typeorm_1.InjectRepository)(disponibilidad_evento_entity_1.DisponibilidadEvento)),
    __param(6, (0, typeorm_1.InjectRepository)(persona_entity_1.Persona)),
    __param(7, (0, typeorm_1.InjectRepository)(notificacione_entity_1.Notificacione)),
    __param(8, (0, typeorm_1.InjectRepository)(reemplazo_entity_1.Reemplazo)),
    __param(9, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(10, (0, common_1.Inject)((0, common_1.forwardRef)(() => notificaciones_service_1.NotificacionesService))),
    __param(11, (0, typeorm_1.InjectRepository)(ubicacion_entity_1.Ubicacion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        notificaciones_service_1.NotificacionesService,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ContratosService);
//# sourceMappingURL=contratos.service.js.map