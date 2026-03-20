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
exports.ServicioEspecialidadSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tipo_servicio_especialidad_entity_1 = require("../../admin/contratos/entities/tipo-servicio-especialidad.entity");
const especialidad_entity_1 = require("../../admin/especialidades/especialidads/entities/especialidad.entity");
let ServicioEspecialidadSeeder = class ServicioEspecialidadSeeder {
    servicioRepo;
    especialidadRepo;
    constructor(servicioRepo, especialidadRepo) {
        this.servicioRepo = servicioRepo;
        this.especialidadRepo = especialidadRepo;
    }
    async run() {
        const guitarra = await this.especialidadRepo.findOneBy({ nombre: 'Guitarra' });
        const violin = await this.especialidadRepo.findOneBy({ nombre: 'Violin' });
        const guitarron = await this.especialidadRepo.findOneBy({ nombre: 'Guitarron' });
        const trompeta1 = await this.especialidadRepo.findOneBy({ nombre: 'Trompeta1' });
        const trompeta2 = await this.especialidadRepo.findOneBy({ nombre: 'Trompeta2' });
        const voz = await this.especialidadRepo.findOneBy({ nombre: 'Vocal' });
        await this.servicioRepo.save([
            { tipo_servicio: 'mariachi', especialidad: guitarra, requerido: true },
            { tipo_servicio: 'mariachi', especialidad: violin, requerido: true },
            { tipo_servicio: 'mariachi', especialidad: guitarron, requerido: true },
            { tipo_servicio: 'mariachi', especialidad: trompeta1, requerido: true },
            { tipo_servicio: 'mariachi', especialidad: trompeta2, requerido: true },
            { tipo_servicio: 'mariachi', especialidad: voz, requerido: true },
        ]);
        const bateria = await this.especialidadRepo.findOneBy({ nombre: 'Batería' });
        const bajo = await this.especialidadRepo.findOneBy({ nombre: 'Bajo' });
        const teclado = await this.especialidadRepo.findOneBy({ nombre: 'Teclado' });
        const voz1 = await this.especialidadRepo.findOneBy({ nombre: 'Vocal' });
        const voz2 = await this.especialidadRepo.findOneBy({ nombre: 'Vocal2' });
        const saxofon = await this.especialidadRepo.findOneBy({ nombre: 'Saxofon' });
        const timbal = await this.especialidadRepo.findOneBy({ nombre: 'Timbales' });
        await this.servicioRepo.save([
            { tipo_servicio: 'orquesta', especialidad: bateria, requerido: true },
            { tipo_servicio: 'orquesta', especialidad: bajo, requerido: true },
            { tipo_servicio: 'orquesta', especialidad: guitarra, requerido: true },
            { tipo_servicio: 'orquesta', especialidad: teclado, requerido: true },
            { tipo_servicio: 'orquesta', especialidad: voz1, requerido: true },
            { tipo_servicio: 'orquesta', especialidad: voz2, requerido: true },
            { tipo_servicio: 'orquesta', especialidad: trompeta1, requerido: true },
            { tipo_servicio: 'orquesta', especialidad: trompeta2, requerido: true },
            { tipo_servicio: 'orquesta', especialidad: saxofon, requerido: true },
            { tipo_servicio: 'orquesta', especialidad: timbal, requerido: true },
        ]);
        console.log('Seeder de servicio-especialidades ejecutado correctamente');
    }
};
exports.ServicioEspecialidadSeeder = ServicioEspecialidadSeeder;
exports.ServicioEspecialidadSeeder = ServicioEspecialidadSeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tipo_servicio_especialidad_entity_1.TipoServicioEspecialidad)),
    __param(1, (0, typeorm_1.InjectRepository)(especialidad_entity_1.Especialidad)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ServicioEspecialidadSeeder);
//# sourceMappingURL=tipo-servicio-especialidades.seeder.js.map