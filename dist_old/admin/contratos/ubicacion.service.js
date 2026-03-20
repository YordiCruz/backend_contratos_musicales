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
exports.UbicacionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ubicacion_entity_1 = require("./entities/ubicacion.entity");
let UbicacionService = class UbicacionService {
    ubicacionRepo;
    constructor(ubicacionRepo) {
        this.ubicacionRepo = ubicacionRepo;
    }
    async create(data) {
        const ubicacion = this.ubicacionRepo.create(data);
        return this.ubicacionRepo.save(ubicacion);
    }
    async findAll() {
        return this.ubicacionRepo.find({ relations: ['contratos'] });
    }
    async findOne(id) {
        const ubicacion = await this.ubicacionRepo.findOne({
            where: { id_ubicacion: id },
            relations: ['contratos'],
        });
        if (!ubicacion)
            throw new common_1.NotFoundException('Ubicación no encontrada');
        return ubicacion;
    }
    async update(id, data) {
        const ubicacion = await this.findOne(id);
        Object.assign(ubicacion, data);
        return this.ubicacionRepo.save(ubicacion);
    }
    async remove(id) {
        const ubicacion = await this.findOne(id);
        return this.ubicacionRepo.remove(ubicacion);
    }
};
exports.UbicacionService = UbicacionService;
exports.UbicacionService = UbicacionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ubicacion_entity_1.Ubicacion)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UbicacionService);
//# sourceMappingURL=ubicacion.service.js.map