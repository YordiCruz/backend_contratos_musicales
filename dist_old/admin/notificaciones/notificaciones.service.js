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
exports.NotificacionesService = void 0;
const common_1 = require("@nestjs/common");
const create_notificacione_dto_1 = require("./dto/create-notificacione.dto");
const typeorm_1 = require("typeorm");
const notificacione_entity_1 = require("./entities/notificacione.entity");
const typeorm_2 = require("@nestjs/typeorm");
const persona_entity_1 = require("../personas/entities/persona.entity");
const contrato_entity_1 = require("../contratos/entities/contrato.entity");
const contratos_service_1 = require("../contratos/contratos.service");
const tipo_servicio_especialidad_entity_1 = require("../contratos/entities/tipo-servicio-especialidad.entity");
const integrante_especialidad_entity_1 = require("../integrantes/entities/integrante-especialidad.entity");
const reemplazo_entity_1 = require("../reemplazos/entities/reemplazo.entity");
let NotificacionesService = class NotificacionesService {
    notificacioneRepo;
    personaRepo;
    integranteEspecialidadRepo;
    tipoServicioEspecialidadRepo;
    contratoRepo;
    reemplazoRepo;
    contratoService;
    constructor(notificacioneRepo, personaRepo, integranteEspecialidadRepo, tipoServicioEspecialidadRepo, contratoRepo, reemplazoRepo, contratoService) {
        this.notificacioneRepo = notificacioneRepo;
        this.personaRepo = personaRepo;
        this.integranteEspecialidadRepo = integranteEspecialidadRepo;
        this.tipoServicioEspecialidadRepo = tipoServicioEspecialidadRepo;
        this.contratoRepo = contratoRepo;
        this.reemplazoRepo = reemplazoRepo;
        this.contratoService = contratoService;
    }
    async generarNotificacion(tipo, contrato, persona, mensaje, resumen) {
        switch (tipo) {
            case create_notificacione_dto_1.TipoNotificacion.INTEGRANTE:
            case create_notificacione_dto_1.TipoNotificacion.REEMPLAZO:
                return {
                    tipo,
                    destinatarioId: persona.id,
                    contratoId: contrato.id_contrato,
                    mensaje: mensaje ??
                        `Evento el ${contrato.fecha_evento} (${contrato.bloque}), en ${contrato.ubicacion.nombre}. Horas: ${contrato.horas_contratadas}`,
                    fecha: new Date(),
                };
            case create_notificacione_dto_1.TipoNotificacion.CLIENTE:
                return {
                    tipo,
                    destinatarioId: persona.id,
                    contratoId: contrato.id_contrato,
                    mensaje: mensaje ??
                        `Su contrato para el ${contrato.fecha_evento} (${contrato.bloque}), en ${contrato.ubicacion.nombre}, está ${contrato.estado}`,
                    fecha: new Date(),
                };
            case create_notificacione_dto_1.TipoNotificacion.ADMIN:
                return {
                    tipo,
                    destinatarioId: persona.id,
                    contratoId: contrato.id_contrato,
                    mensaje: mensaje ??
                        `Nuevo contrato: ${contrato.evento.nombre} - ${contrato.fecha_evento} (${contrato.bloque}) a hrs: ${contrato.hora_inicio}, horas contratadas: ${contrato.horas_contratadas}, Estado: ${contrato.estado}, ¿Desea informar a los integrantes?`,
                    fecha: new Date(),
                };
            case create_notificacione_dto_1.TipoNotificacion.ADMIN_RESUMEN:
                return {
                    tipo,
                    destinatarioId: persona.id,
                    contratoId: contrato.id_contrato,
                    mensaje: JSON.stringify({
                        evento: contrato.evento.nombre,
                        fecha_evento: contrato.fecha_evento,
                        bloque: contrato.bloque,
                        ubicacion: contrato.ubicacion.nombre,
                        aceptados: resumen?.aceptados,
                        rechazados: resumen?.rechazados,
                        pendientes: resumen?.pendientes,
                        faltantes: resumen?.faltantes,
                        sugerencias: resumen?.sugerencias.filter((s) => resumen.rechazados.some((r) => r.especialidad === s.especialidad) || resumen.faltantes.includes(s.especialidad)),
                    }),
                    fecha: new Date(),
                };
        }
    }
    async enviar(dto) {
        const persona = await this.personaRepo.findOne({
            where: { id: dto.destinatarioId },
        });
        const contrato = await this.contratoRepo.findOne({
            where: { id_contrato: dto.contratoId },
        });
        if (!persona || !contrato) {
            throw new Error('Persona o contrato no encontrados');
        }
        const notificacion = this.notificacioneRepo.create({
            tipo: dto.tipo,
            persona,
            contrato,
            mensaje: dto.mensaje,
            fecha: dto.fecha,
        });
        await this.notificacioneRepo.save(notificacion);
        return { status: 'ok', notificacion };
    }
    async notificarIntegrantesPorServicio(contrato) {
        const especialidades = await this.tipoServicioEspecialidadRepo.find({
            where: { tipo_servicio: contrato.tipo_servicio, requerido: true },
        });
        const idsEspecialidades = especialidades.map((e) => e.especialidad.id);
        const relaciones = await this.integranteEspecialidadRepo.find({
            where: {
                especialidad: { id: (0, typeorm_1.In)(idsEspecialidades) },
                tipo: 'primario',
            },
            relations: ['integrante', 'integrante.persona'],
        });
        const integrantes = relaciones.map((r) => r.integrante);
        const results = [];
        for (const integrante of integrantes) {
            const dto = await this.generarNotificacion(create_notificacione_dto_1.TipoNotificacion.INTEGRANTE, contrato, integrante.persona);
            const notif = await this.enviar(dto);
            results.push(notif);
        }
        return { status: 'ok', total: results.length, notificaciones: results };
    }
    async notificaReemplazos(contratoId) {
        console.log('🔔 Iniciando notificarReemplazos para contrato:', contratoId);
        const contrato = await this.contratoRepo.findOne({ where: { id_contrato: contratoId } });
        if (!contrato)
            throw new Error('Contrato no encontrado');
        const resumen = await this.contratoService.getResumenContrato(contratoId);
        const results = [];
        for (const s of resumen.sugerencias) {
            for (const candidato of s.candidatos) {
                const replacement = await this.reemplazoRepo.findOne({
                    where: { id: candidato.id },
                    relations: ['persona'],
                });
                if (!replacement?.persona)
                    continue;
                const persona = replacement.persona;
                const existente = await this.notificacioneRepo.findOne({
                    where: {
                        persona: { id: persona.id },
                        contrato: { id_contrato: contratoId },
                        tipo: create_notificacione_dto_1.TipoNotificacion.REEMPLAZO,
                        estado: 'pendiente',
                    },
                });
                if (existente) {
                    console.log(`⚠️ Ya existe notificación pendiente para ${persona.nombre}, no se crea otra.`);
                    continue;
                }
                const dto = await this.generarNotificacion(create_notificacione_dto_1.TipoNotificacion.REEMPLAZO, contrato, persona);
                const notif = await this.enviar(dto);
                console.log('💾 Notificación creada:', notif.notificacion.id);
                results.push(notif);
            }
        }
        return { status: 'ok', total: results.length, notificaciones: results };
    }
    async notificarReemplazoIndividual(contratoId, reemplazoId) {
        const contrato = await this.contratoRepo.findOne({
            where: { id_contrato: contratoId },
            relations: ['ubicacion', 'evento'],
        });
        if (!contrato)
            throw new Error('Contrato no encontrado');
        const replacement = await this.reemplazoRepo.findOne({
            where: { id: reemplazoId },
            relations: ['persona'],
        });
        if (!replacement || !replacement.persona) {
            throw new Error('Reemplazo o persona no encontrado');
        }
        const persona = replacement.persona;
        const existente = await this.notificacioneRepo.findOne({
            where: {
                persona: { id: persona.id },
                contrato: { id_contrato: contratoId },
                tipo: create_notificacione_dto_1.TipoNotificacion.REEMPLAZO,
                estado: 'pendiente',
            },
        });
        if (existente) {
            return {
                status: 'skip',
                mensaje: `Ya existe una notificación pendiente para ${persona.nombre}`,
                notificacion: existente,
            };
        }
        const dto = await this.generarNotificacion(create_notificacione_dto_1.TipoNotificacion.REEMPLAZO, contrato, persona);
        const notif = await this.enviar(dto);
        return {
            status: 'ok',
            mensaje: `Notificación enviada a ${persona.nombre}`,
            notificacion: notif.notificacion,
        };
    }
    async notificarAdelanto(contratoId) {
        const contrato = await this.contratoRepo.findOne({
            where: { id_contrato: contratoId },
            relations: ['cliente', 'cliente.persona', 'ubicacion'],
        });
        if (!contrato)
            throw new common_1.NotFoundException('Contrato no encontrado');
        const existente = await this.notificacioneRepo.findOne({
            where: {
                contrato: { id_contrato: contratoId },
                persona: { id: contrato.cliente.persona.id },
                tipo: create_notificacione_dto_1.TipoNotificacion.CLIENTE,
                estado: 'pendiente',
            },
        });
        if (existente) {
            return {
                status: 'skip',
                mensaje: 'Ya existe una notificación pendiente de adelanto para este cliente',
                notificacion: existente,
            };
        }
        const dto = await this.generarNotificacion(create_notificacione_dto_1.TipoNotificacion.CLIENTE, contrato, contrato.cliente.persona, `Estimado cliente, para continuar con su contrato del ${contrato.fecha_evento} (${contrato.bloque}) en ${contrato.ubicacion.nombre}, es necesario realizar el pago de adelanto.`);
        return this.enviar(dto);
    }
    findAll() {
        return this.notificacioneRepo.find();
    }
};
exports.NotificacionesService = NotificacionesService;
exports.NotificacionesService = NotificacionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(notificacione_entity_1.Notificacione)),
    __param(1, (0, typeorm_2.InjectRepository)(persona_entity_1.Persona)),
    __param(2, (0, typeorm_2.InjectRepository)(integrante_especialidad_entity_1.IntegranteEspecialidad)),
    __param(3, (0, typeorm_2.InjectRepository)(tipo_servicio_especialidad_entity_1.TipoServicioEspecialidad)),
    __param(4, (0, typeorm_2.InjectRepository)(contrato_entity_1.Contrato)),
    __param(5, (0, typeorm_2.InjectRepository)(reemplazo_entity_1.Reemplazo)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        contratos_service_1.ContratosService])
], NotificacionesService);
//# sourceMappingURL=notificaciones.service.js.map