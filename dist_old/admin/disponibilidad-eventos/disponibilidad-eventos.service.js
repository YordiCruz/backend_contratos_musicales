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
exports.DisponibilidadEventosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const disponibilidad_evento_entity_1 = require("./entities/disponibilidad-evento.entity");
let DisponibilidadEventosService = class DisponibilidadEventosService {
    disponibilidadRepo;
    constructor(disponibilidadRepo) {
        this.disponibilidadRepo = disponibilidadRepo;
    }
    async getDisponibilidadPorMes(año, mes) {
        return this.disponibilidadRepo
            .createQueryBuilder('d')
            .where('EXTRACT(YEAR FROM d.fecha) = :año', { año })
            .andWhere('EXTRACT(MONTH FROM d.fecha) = :mes', { mes })
            .getMany();
    }
    async getDisponibilidadPorDia(fecha) {
        return this.disponibilidadRepo.find({ where: { fecha } });
    }
    async marcarOcupado(fecha, bloque, contratoId) {
        let slot = await this.disponibilidadRepo.findOne({ where: { fecha, bloque } });
        if (!slot) {
            slot = this.disponibilidadRepo.create({ fecha, bloque });
        }
        slot.estado = 'ocupado';
        slot.contrato = { id_contrato: contratoId };
        return this.disponibilidadRepo.save(slot);
    }
    async marcarLibre(fecha, bloque) {
        const slot = await this.disponibilidadRepo.findOne({ where: { fecha, bloque } });
        if (!slot)
            throw new common_1.NotFoundException('Slot no encontrado');
        slot.estado = 'libre';
        slot.contrato = null;
        return this.disponibilidadRepo.save(slot);
    }
};
exports.DisponibilidadEventosService = DisponibilidadEventosService;
exports.DisponibilidadEventosService = DisponibilidadEventosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(disponibilidad_evento_entity_1.DisponibilidadEvento)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DisponibilidadEventosService);
//# sourceMappingURL=disponibilidad-eventos.service.js.map