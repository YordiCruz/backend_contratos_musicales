import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';
import { FiltrosPersonaDto } from './dto/filtros-persona.dto';
import { ResponsePersonaDto } from './dto/reponse-persona.dto';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { User } from '../users/entities/user.entity';
export declare class PersonasService {
    private readonly personarepo;
    private readonly userRepo;
    constructor(personarepo: Repository<Persona>, userRepo: Repository<User>);
    create(createperson: CreatePersonaDto): Promise<Persona>;
    findAll(filters: FiltrosPersonaDto): Promise<ResponsePersonaDto[]>;
    findOne(id: string): Promise<Persona>;
    update(id: string, updatePersonaDto: UpdatePersonaDto): Promise<Persona>;
    remove(id: string): Promise<Persona>;
}
