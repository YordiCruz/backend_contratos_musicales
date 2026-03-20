import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Persona } from 'src/admin/personas/entities/persona.entity';
import { DataSource, Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { FiltroClientDto } from './dto/filtro-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { CreateClientDataDto } from './dto/create-client-data.dto';
export declare class ClientsService {
    private readonly clienteRepo;
    private readonly personaRepo;
    private readonly dataSource;
    constructor(clienteRepo: Repository<Client>, personaRepo: Repository<Persona>, dataSource: DataSource);
    create(createClientDto: CreateClientDto, user: any): Promise<Client>;
    findAll(filters: FiltroClientDto): Promise<ClientResponseDto[]>;
    findOne(id: string): Promise<Client | null>;
    update(id: string, updateclientDto: UpdateClientDto): Promise<UpdateResponseDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createClientFromExistingPersona(idPersona: string, dto: CreateClientDataDto, user: any): Promise<Client>;
}
