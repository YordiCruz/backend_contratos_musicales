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
exports.PersonasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const persona_entity_1 = require("./entities/persona.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
let PersonasService = class PersonasService {
    personarepo;
    userRepo;
    constructor(personarepo, userRepo) {
        this.personarepo = personarepo;
        this.userRepo = userRepo;
    }
    create(createperson) {
        const person = this.personarepo.create(createperson);
        return this.personarepo.save(person);
    }
    async findAll(filters) {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const query = this.personarepo.createQueryBuilder('persona');
        const sortField = filters.sort || 'persona.creado_en';
        const sortOrder = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        query.orderBy(sortField, sortOrder);
        if (filters.search) {
            query.andWhere('persona.nombre LIKE :search', {
                search: `%${filters.search}%`,
            });
        }
        if (filters.documento_identidad) {
            query.andWhere('persona.documento_identidad = :documento_identidad', {
                documento_identidad: filters.documento_identidad,
            });
        }
        const persons = await query
            .skip((page - 1) * limit)
            .take(filters.limit)
            .getMany();
        return persons.map(person => ({
            id: person.id,
            nombre: person.nombre,
            apellido: person.apellido,
            documento_identidad: person.documento_identidad,
            email: person.email,
            telefono: person.telefono
        }));
    }
    async findOne(id) {
        const usr = await this.personarepo.findOne({
            where: { id }
        });
        if (!usr) {
            throw new Error('Usuario no encontrado');
        }
        return usr;
    }
    async update(id, updatePersonaDto) {
        const user = await this.personarepo.findOne({ where: { id } });
        if (!user) {
            throw new Error('Persona no encontrada');
        }
        const update = Object.assign(user, updatePersonaDto);
        const saved = await this.personarepo.save(update);
        if (!saved) {
            throw new Error('No se pudo actualizar la persona');
        }
        return saved;
    }
    async remove(id) {
        const persona = await this.findOne(id);
        const tieneUsuario = await this.userRepo.findOne({ where: { persona: { id } } });
        if (tieneUsuario) {
            throw new common_1.BadRequestException('No se puede eliminar la persona porque está asociada a otro módulo');
        }
        return await this.personarepo.remove(persona);
    }
};
exports.PersonasService = PersonasService;
exports.PersonasService = PersonasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(persona_entity_1.Persona)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PersonasService);
//# sourceMappingURL=personas.service.js.map