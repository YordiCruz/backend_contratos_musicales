import { CategoriasEspecialidad } from 'src/admin/especialidades/categorias_especialidads/entities/categorias_especialidad.entity';
import { Especialidad } from 'src/admin/especialidades/especialidads/entities/especialidad.entity';
import { Repository } from 'typeorm';
export declare class EspecialidadesSeeder {
    private readonly especialidadRepo;
    private readonly categoriaRepo;
    constructor(especialidadRepo: Repository<Especialidad>, categoriaRepo: Repository<CategoriasEspecialidad>);
    run(): Promise<void>;
}
