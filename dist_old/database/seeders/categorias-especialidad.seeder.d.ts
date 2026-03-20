import { CategoriasEspecialidad } from 'src/admin/especialidades/categorias_especialidads/entities/categorias_especialidad.entity';
import { Repository } from 'typeorm';
export declare class CategoriasEspecialidadSeeder {
    private readonly categoriaRepo;
    constructor(categoriaRepo: Repository<CategoriasEspecialidad>);
    run(): Promise<void>;
}
