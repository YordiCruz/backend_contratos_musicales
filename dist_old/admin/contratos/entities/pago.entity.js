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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pago = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const contrato_entity_1 = require("./contrato.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Pago = class Pago {
    id_pago;
    contrato;
    monto;
    metodo;
    tipo;
    referencia;
    fecha_pago;
    registrado_por;
    static _OPENAPI_METADATA_FACTORY() {
        return { id_pago: { required: true, type: () => String }, contrato: { required: true, type: () => require("./contrato.entity").Contrato }, monto: { required: true, type: () => Number }, metodo: { required: true, type: () => String }, tipo: { required: true, type: () => String }, referencia: { required: true, type: () => String }, fecha_pago: { required: true, type: () => Date }, registrado_por: { required: true, type: () => require("../../users/entities/user.entity").User } };
    }
};
exports.Pago = Pago;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Pago.prototype, "id_pago", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contrato_entity_1.Contrato, contrato => contrato.pagos, { eager: true }),
    __metadata("design:type", contrato_entity_1.Contrato)
], Pago.prototype, "contrato", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Pago.prototype, "monto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Pago.prototype, "metodo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Pago.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Pago.prototype, "referencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Pago.prototype, "fecha_pago", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, usuario => usuario.pagos, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Pago.prototype, "registrado_por", void 0);
exports.Pago = Pago = __decorate([
    (0, typeorm_1.Entity)('pagos')
], Pago);
//# sourceMappingURL=pago.entity.js.map