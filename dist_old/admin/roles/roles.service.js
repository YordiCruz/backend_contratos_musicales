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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("./entities/role.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
let RolesService = class RolesService {
    rolerepo;
    userrepo;
    constructor(rolerepo, userrepo) {
        this.rolerepo = rolerepo;
        this.userrepo = userrepo;
    }
    create(createRoleDto) {
        return 'This action adds a new role';
    }
    async findAll() {
        return this.rolerepo.find({
            relations: ['permissions'],
        });
    }
    async assignRoles(userId, dto) {
        const user = await this.userrepo.findOne({
            where: { id: userId },
            relations: ['roles'],
        });
        if (!user)
            throw new Error('Usuario no encontrado');
        const roles = await this.rolerepo.findByIds(dto.rolesIds);
        if (roles.length !== dto.rolesIds.length) {
            throw new Error('Uno o más roles no existen');
        }
        const rolesToAdd = roles.filter((role) => !user.roles.some((r) => r.id === role.id));
        if (rolesToAdd.length === 0) {
            const plural = dto.rolesIds.length > 1
                ? 'Los roles estaban asignados'
                : 'El rol estaba asignado';
            return { message: plural };
        }
        user.roles = [...user.roles, ...rolesToAdd];
        await this.userrepo.save(user);
        const plural = rolesToAdd.length > 1 ? 'Roles asignados correctamente' : 'Rol asignado correctamente';
        return { message: plural };
    }
    findOne(id) {
        return `This action returns a #${id} role`;
    }
    update(id, updateRoleDto) {
        return `This action updates a #${id} role`;
    }
    async removeRole(userId, roleId) {
        const user = await this.userrepo.findOne({
            where: { id: userId },
            relations: ['roles'],
        });
        if (!user)
            throw new Error('Usuario no encontrado');
        const hasRole = user.roles.some((role) => role.id === roleId);
        if (!hasRole) {
            return { message: 'El usuario no tiene asignado este rol' };
        }
        user.roles = user.roles.filter((role) => role.id !== roleId);
        await this.userrepo.save(user);
        return { message: 'Rol removido correctamente' };
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map