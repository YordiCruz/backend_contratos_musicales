import { CreateCategoriasEspecialidadDto } from './dto/create-categorias_especialidad.dto';
import { UpdateCategoriasEspecialidadDto } from './dto/update-categorias_especialidad.dto';
import { CategoriasEspecialidad } from './entities/categorias_especialidad.entity';
import { Repository } from 'typeorm';
export declare class CategoriasEspecialidadsService {
    private readonly categorepo;
    constructor(categorepo: Repository<CategoriasEspecialidad>);
    create(createCategoriasEspecialidadDto: CreateCategoriasEspecialidadDto): string;
    findAll(): Promise<CategoriasEspecialidad[]>;
    findOne(id: number): string;
    update(id: number, updateCategoriasEspecialidadDto: UpdateCategoriasEspecialidadDto): string;
    remove(id: number): string;
}
