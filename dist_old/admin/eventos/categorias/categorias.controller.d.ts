import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
export declare class CategoriasController {
    private readonly categoriasService;
    constructor(categoriasService: CategoriasService);
    create(createCategoriaDto: CreateCategoriaDto, req: any): Promise<import("./entities/categoria.entity").Categoria>;
    findAll(): Promise<import("./entities/categoria.entity").Categoria[]>;
    findOne(id: string): Promise<import("./entities/categoria.entity").Categoria>;
    update(id: string, body: any, req: any): Promise<import("./entities/categoria.entity").Categoria | {
        message: string;
    } | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
