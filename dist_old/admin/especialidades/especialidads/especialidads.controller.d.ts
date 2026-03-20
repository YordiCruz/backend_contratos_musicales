import { EspecialidadsService } from './especialidads.service';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { FiltrosEspecialidadDto } from './dto/filtros-especialidad.dto';
export declare class EspecialidadsController {
    private readonly especialidadsService;
    constructor(especialidadsService: EspecialidadsService);
    create(createEspecialidadDto: CreateEspecialidadDto): Promise<import("./entities/especialidad.entity").Especialidad>;
    findAll(filters: FiltrosEspecialidadDto): Promise<import("./dto/response-especialidad.dto").ResponseEspecialidadDto[]>;
    findOne(id: string): Promise<import("./dto/response-especialidad.dto").ResponseEspecialidadDto>;
    update(id: string, updateEspecialidadDto: UpdateEspecialidadDto): Promise<import("./entities/especialidad.entity").Especialidad>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
