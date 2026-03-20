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
exports.PermissionsSeeder = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const permission_entity_1 = require("../../admin/permissions/entities/permission.entity");
const role_entity_1 = require("../../admin/roles/entities/role.entity");
const typeorm_2 = require("typeorm");
let PermissionsSeeder = class PermissionsSeeder {
    permisorepo;
    rolRepo;
    constructor(permisorepo, rolRepo) {
        this.permisorepo = permisorepo;
        this.rolRepo = rolRepo;
    }
    async run() {
        const permisos = [
            { nombre: 'crear_usuarios', descripcion: 'crear, editar, eliminar usuarios internos' },
            { nombre: 'aprobar_contratos', descripcion: 'aprobar, modificar o cancelar contratos.' },
            { nombre: 'crear_eventos', descripcion: 'crear y administrar eventos musicales' },
        ];
        const permisosCreados = [];
        for (const p of permisos) {
            let permiso = await this.permisorepo.findOne({ where: { nombre: p.nombre } });
            if (!permiso) {
                permiso = await this.permisorepo.save(this.permisorepo.create(p));
            }
            permisosCreados.push(permiso);
        }
        const admin = await this.rolRepo.findOne({ where: { nombre: 'admin' }, relations: ['permissions'] });
        const viewer = await this.rolRepo.findOne({ where: { nombre: 'viewer' }, relations: ['permissions'] });
        const empleado = await this.rolRepo.findOne({ where: { nombre: 'empleado' }, relations: ['permissions'] });
        const cliente = await this.rolRepo.findOne({ where: { nombre: 'cliente' }, relations: ['permissions'] });
        if (!admin || !viewer || !empleado || !cliente) {
            console.error('Faltan roles en la base de datos');
            return;
        }
        const crearUsuarios = permisosCreados.find(p => p.nombre === 'crear_usuarios');
        const aprobarContratos = permisosCreados.find(p => p.nombre === 'aprobar_contratos');
        const crearEventos = permisosCreados.find(p => p.nombre === 'crear_eventos');
        if (!crearUsuarios || !aprobarContratos || !crearEventos) {
            throw new Error('Faltan permisos en la base de datos');
        }
        admin.permissions = [crearUsuarios, aprobarContratos, crearEventos];
        await this.rolRepo.save(admin);
        viewer.permissions = [];
        await this.rolRepo.save(viewer);
        empleado.permissions = [crearEventos];
        await this.rolRepo.save(empleado);
        cliente.permissions = [aprobarContratos];
        await this.rolRepo.save(cliente);
        console.log('Permisos creados y asignados a roles correctamente');
    }
};
exports.PermissionsSeeder = PermissionsSeeder;
exports.PermissionsSeeder = PermissionsSeeder = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PermissionsSeeder);
//# sourceMappingURL=permissions.seeder.js.map