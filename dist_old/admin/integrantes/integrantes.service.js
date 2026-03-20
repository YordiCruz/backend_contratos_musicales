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
exports.IntegrantesService = void 0;
const common_1 = require("@nestjs/common");
const integrante_entity_1 = require("./entities/integrante.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const persona_entity_1 = require("../personas/entities/persona.entity");
const especialidad_entity_1 = require("../especialidades/especialidads/entities/especialidad.entity");
const integrante_especialidad_entity_1 = require("./entities/integrante-especialidad.entity");
let IntegrantesService = class IntegrantesService {
    integranterepo;
    especialidadrepo;
    dataSource;
    constructor(integranterepo, especialidadrepo, dataSource) {
        this.integranterepo = integranterepo;
        this.especialidadrepo = especialidadrepo;
        this.dataSource = dataSource;
    }
    async create(createIntegranteDto, user) {
        return await this.dataSource.transaction(async (manager) => {
            const { persona: personaDto, integrante: integranteDto } = createIntegranteDto;
            let persona = await manager.findOne(persona_entity_1.Persona, {
                where: { documento_identidad: personaDto.documento_identidad }
            });
            if (!persona) {
                persona = await manager.save(persona_entity_1.Persona, personaDto);
            }
            const yaIntegrante = await manager.findOne(integrante_entity_1.Integrante, {
                where: { persona: { id: persona.id } }
            });
            if (yaIntegrante) {
                throw new Error('Esta persona ya es integrante');
            }
            const nuevoIntegrante = manager.create(integrante_entity_1.Integrante, {
                ...integranteDto,
                persona,
                registrado_por: user?.id ? { id: user.id } : undefined
            });
            return await manager.save(integrante_entity_1.Integrante, nuevoIntegrante);
        });
    }
    async findAll(filters) {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const query = this.integranterepo
            .createQueryBuilder('integrante')
            .leftJoinAndSelect('integrante.persona', 'persona')
            .leftJoinAndSelect('integrante.especialidadesAsignadas', 'ie')
            .leftJoinAndSelect('ie.especialidad', 'especialidad')
            .leftJoinAndSelect('especialidad.categoria', 'categoria');
        const sortField = filters.sort || 'integrante.creado_en';
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
            query.andWhere('integrante.estado = :estado', {
                estado: filters.estado,
            });
        }
        const integrantes = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
        return integrantes.map(integrante => ({
            id: integrante.id,
            tarifa_base_hora: integrante.tarifa_base_hora,
            moneda: integrante.moneda,
            fecha_ingreso: integrante.fecha_ingreso,
            estado: integrante.estado,
            creado_en: integrante.creado_en,
            actualizado_en: integrante.actualizado_en,
            eliminado_en: integrante.eliminado_en ?? null,
            persona: integrante.persona
                ? {
                    id: integrante.persona.id,
                    nombre: integrante.persona.nombre,
                    apellido: integrante.persona.apellido,
                    email: integrante.persona.email,
                    telefono: integrante.persona.telefono,
                    documento_identidad: integrante.persona.documento_identidad,
                }
                : null,
            especialidades: integrante.especialidadesAsignadas
                ?.filter(esp => esp.especialidad != null)
                .map(esp => ({
                id: esp.especialidad.id,
                nombre: esp.especialidad.nombre,
                descripcion: esp.especialidad.descripcion,
                estado: esp.especialidad.estado,
                categoria: esp.especialidad.categoria
                    ? {
                        id: esp.especialidad.categoria.id,
                        nombre: esp.especialidad.categoria.nombre,
                        icono: esp.especialidad.categoria.icono,
                        estado: esp.especialidad.categoria.estado
                    }
                    : null
            })) ?? []
        }));
    }
    async findOne(id) {
        const usr = await this.integranterepo.findOne({
            where: { id }
        });
        if (!usr) {
            throw new Error('Integrante no encontrado');
        }
        return usr;
    }
    async update(id, updateIntegranteDto) {
        const integrante = await this.integranterepo.findOne({ where: { id } });
        if (!integrante) {
            throw new Error('Integrante no encontrado');
        }
        if ('id' in updateIntegranteDto) {
            delete updateIntegranteDto.id;
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
            if (campo in updateIntegranteDto) {
                delete updateIntegranteDto[campo];
            }
        }
        if ('fecha_ingreso' in updateIntegranteDto) {
            delete updateIntegranteDto.fecha_ingreso;
        }
        const update = Object.assign(integrante, updateIntegranteDto);
        const saved = await this.integranterepo.save(update);
        if (!saved) {
            throw new Error('No se pudo actualizar el integrante');
        }
        return {
            id: saved.id,
            tarifa_base_hora: saved.tarifa_base_hora,
            moneda: saved.moneda,
            fecha_ingreso: saved.fecha_ingreso,
            estado: saved.estado,
            creado_en: saved.creado_en,
            actualizado_en: saved.actualizado_en,
            eliminado_en: saved.eliminado_en ?? null
        };
    }
    async remove(id) {
        const integrante = await this.integranterepo.findOne({ where: { id } });
        if (!integrante) {
            throw new Error('Integrante no encontrado');
        }
        integrante.estado = 'inactivo';
        integrante.eliminado_en = new Date();
        await this.integranterepo.save(integrante);
        return { message: 'Integrante desactivado correctamente' };
    }
    async createIntegranteFromExistingPersona(idPersona, dto, user) {
        const integrante = await this.integranterepo.findOne({ where: { id: idPersona } });
        if (!integrante) {
            throw new common_1.NotFoundException('El integrante no existe');
        }
        const existingIntegrante = await this.integranterepo.findOne({ where: { persona: { id: idPersona } } });
        if (existingIntegrante) {
            throw new common_1.BadRequestException('Esta persona ya tiene un integrante asignado');
        }
        const integrant = this.integranterepo.create({
            ...dto,
            persona: { id: idPersona },
            registrado_por: user.id ? { id: user.id } : undefined
        });
        return await this.integranterepo.save(integrant);
    }
    async asignarEspecialidad(id, dto) {
        const integrante = await this.integranterepo.findOne({
            where: { id },
            relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
        });
        if (!integrante)
            throw new common_1.NotFoundException('Integrante no encontrado');
        const especialidad = await this.especialidadrepo.findOne({
            where: { id: dto.id_especialidad },
        });
        if (!especialidad)
            throw new common_1.NotFoundException('Especialidad no encontrada');
        const yaExiste = integrante.especialidadesAsignadas.some(ie => ie.especialidad.id === dto.id_especialidad);
        if (yaExiste) {
            throw new common_1.ConflictException('El integrante ya tiene esta especialidad');
        }
        const yaTienePrimaria = integrante.especialidadesAsignadas.some(ie => ie.tipo === 'primario');
        const tipo = dto.tipo
            ? dto.tipo
            : (yaTienePrimaria ? 'secundario' : 'primario');
        const nuevaRelacion = this.dataSource.getRepository(integrante_especialidad_entity_1.IntegranteEspecialidad).create({
            integrante,
            especialidad,
            tipo,
        });
        await this.dataSource.getRepository(integrante_especialidad_entity_1.IntegranteEspecialidad).save(nuevaRelacion);
        return {
            message: `Se añadió correctamente la especialidad (${especialidad.nombre}) al integrante`,
            tipo: nuevaRelacion.tipo,
        };
    }
    async asignarMultiplesEspecialidades(id, dto) {
        const integrante = await this.integranterepo.findOne({
            where: { id },
            relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
        });
        if (!integrante) {
            throw new common_1.NotFoundException('Integrante no encontrado');
        }
        const especialidades = await this.especialidadrepo.findByIds(dto.especialidades.map(e => e.id_especialidad));
        if (especialidades.length !== dto.especialidades.length) {
            throw new common_1.NotFoundException('Una o más especialidades no existen');
        }
        const idsActuales = new Set(integrante.especialidadesAsignadas.map(ie => ie.especialidad.id));
        const nuevas = especialidades.filter(e => !idsActuales.has(e.id));
        if (nuevas.length === 0) {
            return { message: 'Todas las especialidades ya estaban asignadas' };
        }
        const yaTienePrimaria = integrante.especialidadesAsignadas.some(ie => ie.tipo === 'primario');
        const repoIE = this.dataSource.getRepository(integrante_especialidad_entity_1.IntegranteEspecialidad);
        for (let i = 0; i < nuevas.length; i++) {
            const relacion = repoIE.create({
                integrante,
                especialidad: nuevas[i],
                tipo: !yaTienePrimaria && i === 0 ? 'primario' : 'secundario',
            });
            await repoIE.save(relacion);
        }
        return {
            message: 'Especialidades asignadas correctamente',
            asignadas: nuevas.map(e => e.nombre),
        };
    }
    async eliminarEspecialidad(id, id_especialidad) {
        const integrante = await this.integranterepo.findOne({
            where: { id },
            relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
        });
        if (!integrante) {
            throw new common_1.NotFoundException('Integrante no encontrado');
        }
        const relacion = integrante.especialidadesAsignadas.find(ie => ie.especialidad.id === id_especialidad);
        if (!relacion) {
            throw new common_1.NotFoundException('El integrante no tiene esta especialidad');
        }
        const nombreEspecialidad = relacion.especialidad.nombre;
        await this.dataSource.getRepository(integrante_especialidad_entity_1.IntegranteEspecialidad).remove(relacion);
        return {
            message: `Se quitó correctamente la especialidad: ${nombreEspecialidad} del integrante`,
        };
    }
    async listaEspecialidades(id) {
        const integrante = await this.integranterepo.findOne({
            where: { id },
            relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
        });
        if (!integrante) {
            throw new common_1.NotFoundException('Integrante no encontrado');
        }
        return integrante.especialidadesAsignadas.map(ie => ({
            id: ie.especialidad.id,
            nombre: ie.especialidad.nombre,
            tipo: ie.tipo,
        }));
    }
};
exports.IntegrantesService = IntegrantesService;
exports.IntegrantesService = IntegrantesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(integrante_entity_1.Integrante)),
    __param(1, (0, typeorm_2.InjectRepository)(especialidad_entity_1.Especialidad)),
    __param(2, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.DataSource])
], IntegrantesService);
//# sourceMappingURL=integrantes.service.js.map