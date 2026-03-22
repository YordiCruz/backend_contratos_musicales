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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const persona_entity_1 = require("../personas/entities/persona.entity");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("./entities/client.entity");
let ClientsService = class ClientsService {
    clienteRepo;
    personaRepo;
    dataSource;
    constructor(clienteRepo, personaRepo, dataSource) {
        this.clienteRepo = clienteRepo;
        this.personaRepo = personaRepo;
        this.dataSource = dataSource;
    }
    async create(createClientDto, user) {
        return await this.dataSource.transaction(async (manager) => {
            const { persona: personaDto, cliente: clienteDto } = createClientDto;
            const existe = await manager.findOne(persona_entity_1.Persona, {
                where: { documento_identidad: personaDto.documento_identidad }
            });
            if (existe) {
                throw new Error(`La persona con documento '${personaDto.documento_identidad}' ya existe`);
            }
            const persona = await manager.save(persona_entity_1.Persona, personaDto);
            const nuevoCliente = manager.create(client_entity_1.Client, {
                ...clienteDto,
                persona,
                registrado_por: user?.id ? { id: user.id } : undefined
            });
            return await manager.save(client_entity_1.Client, nuevoCliente);
        });
    }
    async findAll(filters) {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const query = this.clienteRepo.createQueryBuilder('cliente');
        const sortField = filters.sort || 'cliente.creado_en';
        const sortOrder = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        query.orderBy(sortField, sortOrder);
        if (filters.search) {
            query.andWhere('cliente.tipo_cliente LIKE :search', {
                search: `%${filters.search}%`,
            });
        }
        if (filters.estado) {
            query.andWhere('cliente.estado = :estado', {
                estado: filters.estado,
            });
        }
        const clients = await query
            .skip((page - 1) * limit)
            .take(filters.limit)
            .leftJoinAndSelect('cliente.persona', 'persona')
            .getMany();
        return clients.map(cliente => ({
            id: cliente.id,
            tipo_cliente: cliente.tipo_cliente,
            origen_registro: cliente.origen_registro,
            preferencia_contacto: cliente.preferencia_contacto,
            estado: cliente.estado,
            creado_en: cliente.creado_en,
            actualizado_en: cliente.actualizado_en,
            persona: cliente.persona ? {
                id: cliente.persona.id,
                nombre: cliente.persona.nombre,
                apellido: cliente.persona.apellido,
                email: cliente.persona.email,
                telefono: cliente.persona.telefono,
                documento_identidad: cliente.persona.documento_identidad
            } : null
        }));
    }
    findOne(id) {
        const cliente = this.clienteRepo.findOne({
            where: { id },
            relations: ['registrado_por', 'persona'],
        });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente con id: #${id} no encontrado`);
        }
        return cliente;
    }
    async update(id, updateclientDto) {
        const cliente = await this.clienteRepo.findOne({ where: { id } });
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }
        if ('id' in updateclientDto) {
            delete updateclientDto.id;
        }
        if ('documento_identidad' in updateclientDto) {
            delete updateclientDto.documento_identidad;
        }
        const update = Object.assign(cliente, updateclientDto);
        const saved = await this.clienteRepo.save(update);
        if (!saved) {
            throw new Error('No se pudo actualizar el cliente');
        }
        return {
            id: saved.id,
            preferencia_contacto: saved.preferencia_contacto,
            estado: saved.estado,
        };
    }
    async remove(id) {
        const client = await this.clienteRepo.findOne({ where: { id } });
        if (!client) {
            throw new Error('Cliente no encontrado');
        }
        client.estado = 'inactivo';
        client.eliminado_en = new Date();
        await this.clienteRepo.save(client);
        return { message: 'Cliente desactivado correctamente' };
    }
    async createClientFromExistingPersona(idPersona, dto, user) {
        const persona = await this.personaRepo.findOne({ where: { id: idPersona } });
        if (!persona) {
            throw new common_1.NotFoundException('La persona no existe');
        }
        const existingCliente = await this.clienteRepo.findOne({ where: { persona: { id: idPersona } } });
        if (existingCliente) {
            throw new common_1.BadRequestException('Esta persona ya tiene datos de cliente registrados');
        }
        const client = this.clienteRepo.create({
            ...dto,
            persona,
            registrado_por: user?.id ? { id: user.id } : undefined
        });
        return await this.clienteRepo.save(client);
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __param(1, (0, typeorm_1.InjectRepository)(persona_entity_1.Persona)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ClientsService);
//# sourceMappingURL=clients.service.js.map