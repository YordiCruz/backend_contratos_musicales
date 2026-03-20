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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const persona_entity_1 = require("../personas/entities/persona.entity");
let UsersService = class UsersService {
    userrepo;
    personarepo;
    dataSource;
    constructor(userrepo, personarepo, dataSource) {
        this.userrepo = userrepo;
        this.personarepo = personarepo;
        this.dataSource = dataSource;
    }
    async create(createUserDto, user) {
        return await this.dataSource.transaction(async (manager) => {
            const { persona: personaDto, user: userDto } = createUserDto;
            const existe = await manager.findOne(user_entity_1.User, {
                where: { email: userDto.email }
            });
            if (existe) {
                throw new Error(`El usuario '${userDto.email}' ya existe`);
            }
            const exis = await manager.findOne(persona_entity_1.Persona, {
                where: { documento_identidad: personaDto.documento_identidad }
            });
            if (exis) {
                throw new Error(`La persona con documento '${personaDto.documento_identidad}' ya existe`);
            }
            const persona = await manager.save(persona_entity_1.Persona, personaDto);
            const passwordHash = await bcrypt.hash(userDto.password_hash, 12);
            const nuevoUsuario = manager.create(user_entity_1.User, {
                ...userDto,
                password_hash: passwordHash,
                persona,
                registrado_por: user?.id ? { id: user.id } : undefined
            });
            return await manager.save(user_entity_1.User, nuevoUsuario);
        });
    }
    async findAll(filters) {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const query = this.userrepo.createQueryBuilder('user');
        const sortField = filters.sort || 'user.creado_en';
        const sortOrder = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        query.orderBy(sortField, sortOrder);
        if (filters.search) {
            query.andWhere('user.username LIKE :search', {
                search: `%${filters.search}%`,
            });
        }
        if (filters.estado) {
            query.andWhere('user.estado = :estado', {
                estado: filters.estado,
            });
        }
        const users = await query
            .skip((page - 1) * limit)
            .take(filters.limit)
            .leftJoinAndSelect('user.roles', 'roles')
            .leftJoinAndSelect('user.persona', 'persona')
            .getMany();
        return users.map(user => ({
            id: user.id,
            email: user.email,
            ultimo_login: user.ultimo_login,
            estado: user.estado,
            origen_registro: user.origen_registro,
            roles: user.roles.map(role => ({
                id: role.id,
                nombre: role.nombre,
                descripcion: role.descripcion
            })),
            persona: user.persona ? {
                id: user.persona.id,
                nombre: user.persona.nombre,
                apellido: user.persona.apellido,
                email: user.persona.email,
                telefono: user.persona.telefono,
                documento_identidad: user.persona.documento_identidad
            } : null
        }));
    }
    async findOne(id) {
        const usr = await this.userrepo.findOne({
            where: { id }
        });
        if (!usr) {
            throw new Error('Usuario no encontrado');
        }
        return usr;
    }
    async update(id, updateUserDto) {
        const user = await this.userrepo.findOne({ where: { id } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        if ('id' in updateUserDto) {
            delete updateUserDto.id;
        }
        if ('password_hash' in updateUserDto) {
            delete updateUserDto.password_hash;
        }
        const update = Object.assign(user, updateUserDto);
        const saved = await this.userrepo.save(update);
        if (!saved) {
            throw new Error('No se pudo actualizar el usuario');
        }
        return {
            id: saved.id,
            email: saved.email,
            ultimo_login: saved.ultimo_login,
            estado: saved.estado,
            origen_registro: saved.origen_registro,
            persona: saved.persona
        };
    }
    async updatePassword(id, dto) {
        const user = await this.userrepo.findOne({ where: { id } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        if (dto.oldpassword) {
            const isMatch = await bcrypt.compare(dto.oldpassword, user.password_hash);
            if (!isMatch) {
                throw new Error('La contraseña actual es incorrecta');
            }
        }
        const hashed = await bcrypt.hash(dto.newpassword, 12);
        user.password_hash = hashed;
        await this.userrepo.save(user);
        return { message: 'Contraseña actualizada correctamente' };
    }
    async updatePasswordUsers(id, dto) {
        const user = await this.userrepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        if (dto.newpassword && dto.newpassword.trim().length > 0) {
            user.password_hash = await bcrypt.hash(dto.newpassword, 12);
            await this.userrepo.save(user);
            return { message: 'Contraseña actualizada correctamente' };
        }
        return { message: 'Contraseña no cambiada, otros datos pueden actualizarse' };
    }
    async remove(id) {
        const user = await this.userrepo.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        user.estado = 'inactivo';
        user.eliminado_en = new Date();
        await this.userrepo.save(user);
        return { message: 'Usuario desactivado correctamente' };
    }
    async createUserFromExistingPersona(idPersona, dto) {
        const persona = await this.personarepo.findOne({ where: { id: idPersona } });
        if (!persona) {
            throw new common_1.NotFoundException('La persona no existe');
        }
        const existingUser = await this.userrepo.findOne({ where: { persona: { id: idPersona } } });
        if (existingUser) {
            throw new common_1.BadRequestException('Esta persona ya tiene un usuario asignado');
        }
        const user = this.userrepo.create({
            ...dto,
            persona,
        });
        return await this.userrepo.save(user);
    }
    async activar(id) {
        const user = await this.userrepo.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        user.estado = 'activo';
        user.eliminado_en = null;
        await this.userrepo.save(user);
        return { message: 'Usuario reactivado correctamente', user };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(persona_entity_1.Persona)),
    __param(2, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], UsersService);
//# sourceMappingURL=users.service.js.map