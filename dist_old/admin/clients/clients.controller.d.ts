import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { FiltroClientDto } from './dto/filtro-client.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(req: any, createClientDto: CreateClientDto): Promise<import("./entities/client.entity").Client>;
    findAll(filters: FiltroClientDto): Promise<import("./dto/client-response.dto").ClientResponseDto[]>;
    findOne(id: string): Promise<import("./entities/client.entity").Client | null>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<import("./dto/update-response.dto").UpdateResponseDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createClientFromExistingPersona(req: any, idPersona: string, dto: any): Promise<import("./entities/client.entity").Client>;
}
