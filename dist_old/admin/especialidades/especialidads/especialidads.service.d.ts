import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { Especialidad } from './entities/especialidad.entity';
import { Repository } from 'typeorm';
import { CategoriasEspecialidad } from '../categorias_especialidads/entities/categorias_especialidad.entity';
import { ResponseEspecialidadDto } from './dto/response-especialidad.dto';
import { FiltrosEspecialidadDto } from './dto/filtros-especialidad.dto';
export declare class EspecialidadsService {
    private readonly especialidadRepo;
    private readonly categoriaRepo;
    constructor(especialidadRepo: Repository<Especialidad>, categoriaRepo: Repository<CategoriasEspecialidad>);
    create(dto: CreateEspecialidadDto): Promise<Especialidad>;
    findAll(filters: FiltrosEspecialidadDto): Promise<ResponseEspecialidadDto[]>;
    findOne(id: string): Promise<ResponseEspecialidadDto>;
    update(id: string, dto: UpdateEspecialidadDto): Promise<Especialidad>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
