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
exports.EspecialidadesSeeder = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const categorias_especialidad_entity_1 = require("../../admin/especialidades/categorias_especialidads/entities/categorias_especialidad.entity");
const especialidad_entity_1 = require("../../admin/especialidades/especialidads/entities/especialidad.entity");
const typeorm_2 = require("typeorm");
let EspecialidadesSeeder = class EspecialidadesSeeder {
    especialidadRepo;
    categoriaRepo;
    constructor(especialidadRepo, categoriaRepo) {
        this.especialidadRepo = especialidadRepo;
        this.categoriaRepo = categoriaRepo;
    }
    async run() {
        const categorias = await this.categoriaRepo.find();
        const ids = categorias.map(cat => cat.id);
        const especialidades = [
            { nombre: 'Guitarra', id_categoria: ids[0] },
            { nombre: 'Bajo', id_categoria: ids[0] },
            { nombre: 'Acordeón', id_categoria: ids[0] },
            { nombre: 'Trompeta', id_categoria: ids[1] },
            { nombre: 'Teclado', id_categoria: ids[2] },
            { nombre: 'Batería', id_categoria: ids[3] },
            { nombre: 'Vocal', id_categoria: ids[4] },
        ];
        for (const esp of especialidades) {
            const exists = await this.especialidadRepo.findOne({
                where: { nombre: esp.nombre },
            });
            if (!exists) {
                await this.especialidadRepo.save(this.especialidadRepo.create({
                    nombre: esp.nombre,
                    categoria: { id: esp.id_categoria }
                }));
            }
        }
        console.log('Especialidades predefinidas creadas');
    }
};
exports.EspecialidadesSeeder = EspecialidadesSeeder;
exports.EspecialidadesSeeder = EspecialidadesSeeder = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(especialidad_entity_1.Especialidad)),
    __param(1, (0, typeorm_1.InjectRepository)(categorias_especialidad_entity_1.CategoriasEspecialidad)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EspecialidadesSeeder);
//# sourceMappingURL=especialidades.seeder.js.map