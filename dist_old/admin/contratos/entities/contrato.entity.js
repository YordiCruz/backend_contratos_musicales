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
exports.Contrato = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const ubicacion_entity_1 = require("./ubicacion.entity");
const pago_entity_1 = require("./pago.entity");
const client_entity_1 = require("../../../client/clients/entities/client.entity");
const evento_entity_1 = require("../../eventos/eventos/entities/evento.entity");
const contrato_integrante_entity_1 = require("./contrato-integrante.entity");
const contrato_reemplazo_entity_1 = require("./contrato-reemplazo.entity");
const contrato_especialidad_entity_1 = require("./contrato-especialidad.entity");
let Contrato = class Contrato {
    id_contrato;
    cliente;
    evento;
    integrantes;
    reemplazos;
    ubicacion;
    fecha_evento;
    bloque;
    hora_inicio;
    hora_fin;
    tipo_servicio;
    horas_contratadas;
    adelanto;
    saldo;
    admin_aprobacion;
    fecha_adelanto;
    estado;
    motivo_cancelacion;
    creado_en;
    pagos;
    especialidades;
    static _OPENAPI_METADATA_FACTORY() {
        return { id_contrato: { required: true, type: () => String }, cliente: { required: true, type: () => require("../../../client/clients/entities/client.entity").Client }, evento: { required: true, type: () => require("../../eventos/eventos/entities/evento.entity").Evento }, integrantes: { required: true, type: () => [require("./contrato-integrante.entity").ContratoIntegrante] }, reemplazos: { required: true, type: () => [require("./contrato-reemplazo.entity").ContratoReemplazo] }, ubicacion: { required: true, type: () => require("./ubicacion.entity").Ubicacion }, fecha_evento: { required: true, type: () => Date }, bloque: { required: true, type: () => String }, hora_inicio: { required: true, type: () => String }, hora_fin: { required: true, type: () => String }, tipo_servicio: { required: true, type: () => String }, horas_contratadas: { required: true, type: () => Number }, adelanto: { required: true, type: () => Number }, saldo: { required: true, type: () => Number }, admin_aprobacion: { required: true, type: () => Boolean }, fecha_adelanto: { required: true, type: () => Date }, estado: { required: true, type: () => String }, motivo_cancelacion: { required: true, type: () => String }, creado_en: { required: true, type: () => Date }, pagos: { required: true, type: () => [require("./pago.entity").Pago] }, especialidades: { required: true, type: () => [require("./contrato-especialidad.entity").ContratoEspecialidad] } };
    }
};
exports.Contrato = Contrato;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Contrato.prototype, "id_contrato", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, cliente => cliente.contratos, { eager: true }),
    __metadata("design:type", client_entity_1.Client)
], Contrato.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => evento_entity_1.Evento, evento => evento.contratos, { eager: true }),
    __metadata("design:type", evento_entity_1.Evento)
], Contrato.prototype, "evento", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contrato_integrante_entity_1.ContratoIntegrante, contratoIntegrante => contratoIntegrante.contrato, { cascade: true }),
    __metadata("design:type", Array)
], Contrato.prototype, "integrantes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contrato_reemplazo_entity_1.ContratoReemplazo, contratoReemplazo => contratoReemplazo.contrato, { cascade: true }),
    __metadata("design:type", Array)
], Contrato.prototype, "reemplazos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ubicacion_entity_1.Ubicacion, ubicacion => ubicacion.contratos, { eager: true }),
    __metadata("design:type", ubicacion_entity_1.Ubicacion)
], Contrato.prototype, "ubicacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Contrato.prototype, "fecha_evento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Contrato.prototype, "bloque", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], Contrato.prototype, "hora_inicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], Contrato.prototype, "hora_fin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Contrato.prototype, "tipo_servicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Contrato.prototype, "horas_contratadas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Contrato.prototype, "adelanto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Contrato.prototype, "saldo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: 'false' }),
    __metadata("design:type", Boolean)
], Contrato.prototype, "admin_aprobacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Contrato.prototype, "fecha_adelanto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'pendiente' }),
    __metadata("design:type", String)
], Contrato.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Contrato.prototype, "motivo_cancelacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Contrato.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pago_entity_1.Pago, pago => pago.contrato),
    __metadata("design:type", Array)
], Contrato.prototype, "pagos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contrato_especialidad_entity_1.ContratoEspecialidad, ce => ce.contrato, { cascade: true }),
    __metadata("design:type", Array)
], Contrato.prototype, "especialidades", void 0);
exports.Contrato = Contrato = __decorate([
    (0, typeorm_1.Entity)('contratos')
], Contrato);
//# sourceMappingURL=contrato.entity.js.map