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
exports.ReemplazosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reemplazo_entity_1 = require("./entities/reemplazo.entity");
const typeorm_2 = require("typeorm");
const persona_entity_1 = require("../personas/entities/persona.entity");
const especialidad_entity_1 = require("../especialidades/especialidads/entities/especialidad.entity");
const reemplazo_especialidad_entity_1 = require("./entities/reemplazo-especialidad.entity");
let ReemplazosService = class ReemplazosService {
    reemplazoRepo;
    especialidadRepo;
    dataSource;
    constructor(reemplazoRepo, especialidadRepo, dataSource) {
        this.reemplazoRepo = reemplazoRepo;
        this.especialidadRepo = especialidadRepo;
        this.dataSource = dataSource;
    }
    async create(createReemplazoDto, user) {
        return await this.dataSource.transaction(async (manager) => {
            const { persona: personaDto, reemplazo: reemplazoDto } = createReemplazoDto;
            let persona = await manager.findOne(persona_entity_1.Persona, {
                where: { documento_identidad: personaDto.documento_identidad }
            });
            if (!persona) {
                persona = await manager.save(persona_entity_1.Persona, personaDto);
            }
            const yaReemplazo = await manager.findOne(reemplazo_entity_1.Reemplazo, {
                where: { persona: { id: persona.id } }
            });
            if (yaReemplazo) {
                throw new Error('Esta persona ya es un reemplazo');
            }
            const nuevoReemplazo = manager.create(reemplazo_entity_1.Reemplazo, {
                ...reemplazoDto,
                persona,
                registrado_por: user?.id ? { id: user.id } : undefined
            });
            return await manager.save(reemplazo_entity_1.Reemplazo, nuevoReemplazo);
        });
    }
    async findAll(filters) {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const query = this.reemplazoRepo
            .createQueryBuilder('reemplazo')
            .leftJoinAndSelect('reemplazo.persona', 'persona');
        const sortField = filters.sort || 'reemplazo.creado_en';
        const sortOrder = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        query.orderBy(sortField, sortOrder);
        if (filters.search) {
            query.andWhere(`
        persona.nombre ILIKE :search OR
        persona.apellido ILIKE :search OR
        persona.email ILIKE :search OR
        persona.telefono ILIKE :search OR
        persona.documento_identidad ILIKE :search
      `, {
                search: `%${filters.search}%`,
            });
        }
        if (filters.estado) {
            query.andWhere('reemplazo.estado = :estado', {
                estado: filters.estado,
            });
        }
        const reemplazos = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
        return reemplazos.map(reemplazo => ({
            id: reemplazo.id,
            tarifa_base_hora: reemplazo.tarifa_base_hora,
            moneda: reemplazo.moneda,
            estado: reemplazo.estado,
            disponible: reemplazo.disponible,
            creado_en: reemplazo.creado_en,
            actualizado_en: reemplazo.actualizado_en,
            eliminado_en: reemplazo.eliminado_en ?? null,
            persona: reemplazo.persona
                ? {
                    id: reemplazo.persona.id,
                    nombre: reemplazo.persona.nombre,
                    apellido: reemplazo.persona.apellido,
                    email: reemplazo.persona.email,
                    telefono: reemplazo.persona.telefono,
                    documento_identidad: reemplazo.persona.documento_identidad,
                }
                : null,
        }));
    }
    async findOne(id) {
        const reemplazo = await this.reemplazoRepo.findOne({
            where: { id }
        });
        if (!reemplazo) {
            throw new Error('Reemplazo no encontrado');
        }
        return reemplazo;
    }
    async update(id, updateReemplazoDto) {
        const reempla = await this.reemplazoRepo.findOne({ where: { id } });
        if (!reempla) {
            throw new Error('Reemplazo no encontrado');
        }
        if ('id' in updateReemplazoDto) {
            delete updateReemplazoDto.id;
        }
        const camposProtegidos = [
            'id',
            'persona',
            'id_persona',
            'creado_en',
            'eliminado_en',
            'actualizado_en',
        ];
        for (const campo of camposProtegidos) {
            if (campo in updateReemplazoDto) {
                delete updateReemplazoDto[campo];
            }
        }
        const update = Object.assign(reempla, updateReemplazoDto);
        const saved = await this.reemplazoRepo.save(update);
        if (!saved) {
            throw new Error('No se pudo actualizar el reemplazo');
        }
        return {
            id: saved.id,
            tarifa_base_hora: saved.tarifa_base_hora,
            moneda: saved.moneda,
            estado: saved.estado,
            disponible: saved.disponible,
            creado_en: saved.creado_en,
            actualizado_en: saved.actualizado_en,
            eliminado_en: saved.eliminado_en ?? null
        };
    }
    async remove(id) {
        const reemplazo = await this.reemplazoRepo.findOne({ where: { id } });
        if (!reemplazo) {
            throw new Error('Reemplazo no encontrado');
        }
        reemplazo.estado = 'inactivo';
        reemplazo.eliminado_en = new Date();
        await this.reemplazoRepo.save(reemplazo);
        return { message: 'Reemplazo desactivado correctamente' };
    }
    async createReemplazoFromExistingPersona(idPersona, dto, user) {
        const reemplazo = await this.reemplazoRepo.findOne({ where: { id: idPersona } });
        if (!reemplazo) {
            throw new common_1.NotFoundException('El reemplazo no existe');
        }
        const existingreemplazo = await this.reemplazoRepo.findOne({ where: { persona: { id: idPersona } } });
        if (existingreemplazo) {
            throw new common_1.BadRequestException('Esta persona ya tiene un reemplazo asignado');
        }
        const reempla = this.reemplazoRepo.create({
            ...dto,
            persona: { id: idPersona },
            registrado_por: user.id ? { id: user.id } : undefined
        });
        return await this.reemplazoRepo.save(reempla);
    }
    async asignarEspecialidad(id, dto) {
        const reemplazo = await this.reemplazoRepo.findOne({
            where: { id },
            relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
        });
        if (!reemplazo)
            throw new common_1.NotFoundException('Reemplazo no encontrado');
        const especialidad = await this.especialidadRepo.findOne({
            where: { id: dto.id_especialidad },
        });
        if (!especialidad)
            throw new common_1.NotFoundException('Especialidad no encontrada');
        const yaExiste = reemplazo.especialidadesAsignadas.some(re => re.especialidad.id === dto.id_especialidad);
        if (yaExiste) {
            throw new common_1.ConflictException('El reemplazo ya tiene esta especialidad');
        }
        const yaTienePrimaria = reemplazo.especialidadesAsignadas.some(re => re.tipo === 'primario');
        const tipo = dto.tipo
            ? dto.tipo
            : (yaTienePrimaria ? 'secundario' : 'primario');
        const nuevaRelacion = this.dataSource.getRepository(reemplazo_especialidad_entity_1.ReemplazoEspecialidad).create({
            reemplazo,
            especialidad,
            tipo,
        });
        await this.dataSource.getRepository(reemplazo_especialidad_entity_1.ReemplazoEspecialidad).save(nuevaRelacion);
        return {
            message: `Se añadió correctamente la especialidad (${especialidad.nombre}) al reemplazo`,
            tipo: nuevaRelacion.tipo,
        };
    }
    async asignarMultiplesEspecialidades(id, dto) {
        const reemplazo = await this.reemplazoRepo.findOne({
            where: { id },
            relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
        });
        if (!reemplazo) {
            throw new common_1.NotFoundException('Reemplazo no encontrado');
        }
        const especialidades = await this.especialidadRepo.findByIds(dto.especialidades.map(e => e.id_especialidad));
        if (especialidades.length !== dto.especialidades.length) {
            throw new common_1.NotFoundException('Una o más especialidades no existen');
        }
        const idsActuales = new Set(reemplazo.especialidadesAsignadas.map(re => re.especialidad.id));
        const nuevas = dto.especialidades.filter(e => !idsActuales.has(e.id_especialidad));
        if (nuevas.length === 0) {
            return { message: 'Todas las especialidades ya estaban asignadas' };
        }
        const yaTienePrimaria = reemplazo.especialidadesAsignadas.some(re => re.tipo === 'primario');
        const repoRE = this.dataSource.getRepository(reemplazo_especialidad_entity_1.ReemplazoEspecialidad);
        for (let i = 0; i < nuevas.length; i++) {
            const espDto = nuevas[i];
            const especialidad = especialidades.find(e => e.id === espDto.id_especialidad);
            const tipo = espDto.tipo
                ? espDto.tipo
                : (!yaTienePrimaria && i === 0 ? 'primario' : 'secundario');
            const relacion = repoRE.create({
                reemplazo,
                especialidad,
                tipo,
            });
            await repoRE.save(relacion);
        }
        return {
            message: 'Especialidades asignadas correctamente',
            asignadas: nuevas.map(e => {
                const esp = especialidades.find(es => es.id === e.id_especialidad);
                return esp?.nombre;
            }),
        };
    }
    async eliminarEspecialidad(id, id_especialidad) {
        const reemplazo = await this.reemplazoRepo.findOne({
            where: { id },
            relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
        });
        if (!reemplazo) {
            throw new common_1.NotFoundException('Reemplazo no encontrado');
        }
        const relacion = reemplazo.especialidadesAsignadas.find(re => re.especialidad.id === id_especialidad);
        if (!relacion) {
            throw new common_1.NotFoundException('El reemplazo no tiene esta especialidad');
        }
        const nombreEspecialidad = relacion.especialidad.nombre;
        await this.dataSource.getRepository(reemplazo_especialidad_entity_1.ReemplazoEspecialidad).remove(relacion);
        return {
            message: `Se quitó correctamente la especialidad: ${nombreEspecialidad} del reemplazo`,
        };
    }
    async listaEspecialidades(id) {
        const reemplazo = await this.reemplazoRepo.findOne({
            where: { id },
            relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
        });
        if (!reemplazo) {
            throw new common_1.NotFoundException('Reemplazo no encontrado');
        }
        return reemplazo.especialidadesAsignadas.map(re => ({
            id: re.especialidad.id,
            nombre: re.especialidad.nombre,
            tipo: re.tipo,
        }));
    }
};
exports.ReemplazosService = ReemplazosService;
exports.ReemplazosService = ReemplazosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reemplazo_entity_1.Reemplazo)),
    __param(1, (0, typeorm_1.InjectRepository)(especialidad_entity_1.Especialidad)),
    __param(2, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ReemplazosService);
//# sourceMappingURL=reemplazos.service.js.map