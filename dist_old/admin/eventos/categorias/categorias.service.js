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
exports.CategoriasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categoria_entity_1 = require("./entities/categoria.entity");
const typeorm_2 = require("typeorm");
let CategoriasService = class CategoriasService {
    caterepo;
    constructor(caterepo) {
        this.caterepo = caterepo;
    }
    async create(createCategoriaDto, req) {
        const exiscate = await this.caterepo.findOne({
            where: { nombre: createCategoriaDto.nombre }
        });
        if (exiscate) {
            throw new common_1.NotFoundException('categoria existente');
        }
        const cat = this.caterepo.create({
            ...createCategoriaDto,
            creado_por: req.id,
        });
        return this.caterepo.save(cat);
    }
    findAll() {
        return this.caterepo.find();
    }
    async findOne(id) {
        const categoria = await this.caterepo.findOne({
            where: { id_categoria: id },
        });
        if (!categoria) {
            throw new common_1.NotFoundException(`Categoría no encontrada`);
        }
        return categoria;
    }
    async update(id, dto, user) {
        if (dto.estado) {
            await this.caterepo.update({ id_categoria: id }, {
                estado: dto.estado,
                actualizado_por: user.id,
                actualizado_en: new Date()
            });
            return { message: `Estado cambiado a ${dto.estado}` };
        }
        await this.caterepo.update({ id_categoria: id }, {
            ...dto,
            actualizado_por: user.id,
            actualizado_en: new Date()
        });
        return this.caterepo.findOne({ where: { id_categoria: id } });
    }
    async removes(id) {
        console.log('BUSCANDO:', await this.caterepo.findOne({ where: { id_categoria: id } }));
        await this.caterepo.update({ id_categoria: id }, { estado: 'inactivo' });
        return { message: 'Categoria desactivada correctamente' };
    }
};
exports.CategoriasService = CategoriasService;
exports.CategoriasService = CategoriasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categoria_entity_1.Categoria)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriasService);
//# sourceMappingURL=categorias.service.js.map