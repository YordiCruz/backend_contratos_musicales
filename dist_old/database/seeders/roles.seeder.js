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
exports.RolesSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const permission_entity_1 = require("../../admin/permissions/entities/permission.entity");
const role_entity_1 = require("../../admin/roles/entities/role.entity");
const typeorm_2 = require("typeorm");
let RolesSeeder = class RolesSeeder {
    rolerepo;
    permissionRepo;
    constructor(rolerepo, permissionRepo) {
        this.rolerepo = rolerepo;
        this.permissionRepo = permissionRepo;
    }
    async run() {
        const allpermissions = await this.permissionRepo.find();
        const roles = [
            {
                nombre: 'admin',
                descripcion: 'Acceso total al sistema',
                permissions: allpermissions,
            },
            {
                nombre: 'empleado',
                descripcion: 'Puede administrar eventos',
                permissions: allpermissions.filter(p => p.nombre === 'crear_eventos'),
            },
            {
                nombre: 'viewer',
                descripcion: 'Solo lectura',
                permissions: allpermissions.filter(p => p.nombre === 'aprobar_contratos'),
            },
        ];
        for (const role of roles) {
            let savedRole = await this.rolerepo.findOne({ where: { nombre: role.nombre } });
            if (!savedRole) {
                savedRole = await this.rolerepo.save({
                    nombre: role.nombre,
                    descripcion: role.descripcion,
                });
                const permissionIds = role.permissions.map(p => p.id);
                await this.rolerepo
                    .createQueryBuilder()
                    .relation(role_entity_1.Role, 'permissions')
                    .of(savedRole.id)
                    .add(permissionIds);
            }
            const check = await this.rolerepo.findOne({
                where: { id: savedRole.id },
                relations: ['permissions'],
            });
            console.log(`Permisos del rol ${role.nombre}:`, check?.permissions);
        }
        console.log('Roles predefinidos creados con permisos');
    }
};
exports.RolesSeeder = RolesSeeder;
exports.RolesSeeder = RolesSeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RolesSeeder);
//# sourceMappingURL=roles.seeder.js.map