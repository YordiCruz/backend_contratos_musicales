import { CreatePersonaDto } from './dto/create-persona.dto';
import { PersonasService } from './personas.service';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { FiltrosPersonaDto } from './dto/filtros-persona.dto';
export declare class PersonasController {
    private readonly personasService;
    constructor(personasService: PersonasService);
    create(createPersonaDto: CreatePersonaDto): Promise<import("./entities/persona.entity").Persona>;
    findAll(filters: FiltrosPersonaDto): Promise<import("./dto/reponse-persona.dto").ResponsePersonaDto[]>;
    findOne(id: string): Promise<import("./entities/persona.entity").Persona>;
    update(id: string, updatePersonaDto: UpdatePersonaDto): Promise<import("./entities/persona.entity").Persona>;
    remove(id: string): Promise<import("./entities/persona.entity").Persona>;
}
