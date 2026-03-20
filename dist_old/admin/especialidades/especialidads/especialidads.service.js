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
exports.EspecialidadsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const especialidad_entity_1 = require("./entities/especialidad.entity");
const typeorm_2 = require("typeorm");
const categorias_especialidad_entity_1 = require("../categorias_especialidads/entities/categorias_especialidad.entity");
let EspecialidadsService = class EspecialidadsService {
    especialidadRepo;
    categoriaRepo;
    constructor(especialidadRepo, categoriaRepo) {
        this.especialidadRepo = especialidadRepo;
        this.categoriaRepo = categoriaRepo;
    }
    async create(dto) {
        const categoria = await this.categoriaRepo.findOne({
            where: { id: dto.id_categoria },
        });
        if (!categoria) {
            throw new common_1.BadRequestException('La categoría no existe');
        }
        const existingEspecialidad = await this.especialidadRepo.findOne({
            where: { nombre: dto.nombre },
        });
        if (existingEspecialidad) {
            throw new common_1.BadRequestException('La especialidad ya existe');
        }
        const especialidad = this.especialidadRepo.create({
            nombre: dto.nombre,
            descripcion: dto.descripcion,
            categoria,
        });
        return this.especialidadRepo.save(especialidad);
    }
    async findAll(filters) {
        const search = filters.search?.trim() || null;
        const estado = filters.estado?.trim() || null;
        const page = filters.page ? Number(filters.page) : 1;
        const limit = filters.limit ? Number(filters.limit) : 10;
        const query = this.especialidadRepo
            .createQueryBuilder('especialidad')
            .leftJoinAndSelect('especialidad.categoria', 'categoria');
        const allowedSort = {
            nombre: 'especialidad.nombre',
            estado: 'especialidad.estado',
            creado_en: 'especialidad.creado_en',
        };
        const sortField = filters.sort && allowedSort[filters.sort] ? allowedSort[filters.sort] : 'especialidad.creado_en';
        const sortOrder = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        query.orderBy(sortField, sortOrder);
        if (search) {
            query.andWhere(`(especialidad.nombre ILIKE :search
      OR especialidad.descripcion ILIKE :search)`, { search: `%${search}%` });
        }
        if (estado) {
            query.andWhere('especialidad.estado = :estado', {
                estado: estado.toUpperCase(),
            });
        }
        const especialidades = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
        return especialidades.map(especial => ({
            id: especial.id,
            nombre: especial.nombre,
            descripcion: especial.descripcion,
            estado: especial.estado,
            categoria: especial.categoria
                ? {
                    id: especial.categoria.id,
                    nombre: especial.categoria.nombre,
                    icono: especial.categoria.icono,
                    estado: especial.categoria.estado,
                }
                : null,
            creado_en: especial.creado_en,
            actualizado_en: especial.actualizado_en,
            eliminado_en: especial.eliminado_en ?? null,
        }));
    }
    async findOne(id) {
        const especialidad = await this.especialidadRepo.findOne({
            where: { id },
            relations: ['categoria'],
        });
        if (!especialidad) {
            throw new common_1.NotFoundException('Especialidad no encontrada');
        }
        return {
            id: especialidad.id,
            nombre: especialidad.nombre,
            descripcion: especialidad.descripcion,
            estado: especialidad.estado,
            categoria: {
                id: especialidad.categoria.id,
                nombre: especialidad.categoria.nombre,
                icono: especialidad.categoria.icono,
                estado: especialidad.categoria.estado,
            },
            creado_en: especialidad.creado_en,
            actualizado_en: especialidad.actualizado_en
        };
    }
    async update(id, dto) {
        const especialidad = await this.especialidadRepo.findOne({
            where: { id },
            relations: ['categoria'],
        });
        if (!especialidad) {
            throw new common_1.NotFoundException('Especialidad no encontrada');
        }
        if (dto.id_categoria) {
            const categoria = await this.categoriaRepo.findOne({
                where: { id: dto.id_categoria },
            });
            if (!categoria) {
                throw new common_1.BadRequestException('La categoría no existe');
            }
            especialidad.categoria = categoria;
        }
        delete dto.id_categoria;
        Object.assign(especialidad, dto);
        return this.especialidadRepo.save(especialidad);
    }
    async remove(id) {
        const especialidad = await this.especialidadRepo.findOne({ where: { id } });
        if (!especialidad) {
            throw new Error('Especialidad no encontrado');
        }
        especialidad.estado = 'inactivo';
        especialidad.eliminado_en = new Date();
        await this.especialidadRepo.save(especialidad);
        return { message: 'Especialidad desactivado correctamente' };
    }
};
exports.EspecialidadsService = EspecialidadsService;
exports.EspecialidadsService = EspecialidadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(especialidad_entity_1.Especialidad)),
    __param(1, (0, typeorm_1.InjectRepository)(categorias_especialidad_entity_1.CategoriasEspecialidad)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EspecialidadsService);
//# sourceMappingURL=especialidads.service.js.map