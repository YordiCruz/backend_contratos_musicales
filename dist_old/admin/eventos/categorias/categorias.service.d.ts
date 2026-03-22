import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
export declare class CategoriasService {
    private readonly caterepo;
    constructor(caterepo: Repository<Categoria>);
    create(createCategoriaDto: CreateCategoriaDto, req: any): Promise<Categoria>;
    findAll(): Promise<Categoria[]>;
    findOne(id: string): Promise<Categoria>;
    update(id: string, dto: any, user: any): Promise<Categoria | {
        message: string;
    } | null>;
    removes(id: string): Promise<{
        message: string;
    }>;
}
