import { Categoria } from 'src/admin/eventos/categorias/entities/categoria.entity';
import { Repository } from 'typeorm';
export declare class CategoriasEventoSeeder {
    private readonly categoriaRepo;
    constructor(categoriaRepo: Repository<Categoria>);
    run(): Promise<void>;
}
