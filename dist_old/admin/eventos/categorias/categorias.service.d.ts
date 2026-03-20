import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
export declare class CategoriasService {
    private readonly caterepo;
    constructor(caterepo: Repository<Categoria>);
    create(createCategoriaDto: CreateCategoriaDto, req: any): Promise<Categoria>;
    findAll(): Promise<Categoria[]>;
    findOne(id: string): Promise<Categoria>;
    update(id: string, updateCategoriaDto: UpdateCategoriaDto, req: any): Promise<Categoria | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
