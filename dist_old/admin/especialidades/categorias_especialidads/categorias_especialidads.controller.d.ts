import { CategoriasEspecialidadsService } from './categorias_especialidads.service';
export declare class CategoriasEspecialidadsController {
    private readonly categoriasEspecialidadsService;
    constructor(categoriasEspecialidadsService: CategoriasEspecialidadsService);
    findAll(): Promise<import("./entities/categorias_especialidad.entity").CategoriasEspecialidad[]>;
}
