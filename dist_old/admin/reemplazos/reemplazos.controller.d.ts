import { ReemplazosService } from './reemplazos.service';
import { CreateReemplazoDto } from './dto/create-reemplazo.dto';
import { UpdateReemplazoDto } from './dto/update-reemplazo.dto';
import { FiltrosReemplazoDto } from './dto/filtros-reemplazo.dto';
import { AsignarEspecialidadDto } from './dto/asignar-especialidad.dto';
import { AsignarVariasEspecialidadesDto } from './dto/asignar-varias-especialidades.dto';
export declare class ReemplazosController {
    private readonly reemplazosService;
    constructor(reemplazosService: ReemplazosService);
    create(req: any, createReemplazoDto: CreateReemplazoDto): Promise<import("./entities/reemplazo.entity").Reemplazo>;
    findAll(filters: FiltrosReemplazoDto): Promise<import("./dto/response-reemplazo.dto").ResponseReemplazoDto[]>;
    findOne(id: string): Promise<import("./entities/reemplazo.entity").Reemplazo>;
    update(id: string, updateReemplazoDto: UpdateReemplazoDto): Promise<import("./dto/response-update-reemplazo.dto").ResponseUpdateReemplazoDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createReemplazFromExistingPersona(idPersona: string, req: any, dto: any): Promise<import("./entities/reemplazo.entity").Reemplazo>;
    listEspecialidades(id: string): Promise<{
        id: string;
        nombre: string;
        tipo: string;
    }[]>;
    asignarEspecialidad(id: string, dto: AsignarEspecialidadDto): Promise<{
        message: string;
        tipo: string;
    }>;
    asignarMultiples(id: string, dto: AsignarVariasEspecialidadesDto): Promise<{
        message: string;
        asignadas?: undefined;
    } | {
        message: string;
        asignadas: (string | undefined)[];
    }>;
    eliminarEspecialidad(id: string, idEspecialidad: string): Promise<{
        message: string;
    }>;
}
