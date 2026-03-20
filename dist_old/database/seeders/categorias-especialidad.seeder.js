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
exports.CategoriasEspecialidadSeeder = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const categorias_especialidad_entity_1 = require("../../admin/especialidades/categorias_especialidads/entities/categorias_especialidad.entity");
const typeorm_2 = require("typeorm");
let CategoriasEspecialidadSeeder = class CategoriasEspecialidadSeeder {
    categoriaRepo;
    constructor(categoriaRepo) {
        this.categoriaRepo = categoriaRepo;
    }
    async run() {
        const categorias = [
            { nombre: 'Instrumentos de Cuerda' },
            { nombre: 'Instrumentos de Viento' },
            { nombre: 'Instrumentos de Teclado' },
            { nombre: 'Percusión' },
            { nombre: 'Vocal' },
        ];
        for (const cat of categorias) {
            const exists = await this.categoriaRepo.findOne({
                where: { nombre: cat.nombre },
            });
            if (!exists) {
                await this.categoriaRepo.save(this.categoriaRepo.create(cat));
            }
        }
        console.log('Categorías predefinidas creadas');
    }
};
exports.CategoriasEspecialidadSeeder = CategoriasEspecialidadSeeder;
exports.CategoriasEspecialidadSeeder = CategoriasEspecialidadSeeder = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(categorias_especialidad_entity_1.CategoriasEspecialidad)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriasEspecialidadSeeder);
//# sourceMappingURL=categorias-especialidad.seeder.js.map