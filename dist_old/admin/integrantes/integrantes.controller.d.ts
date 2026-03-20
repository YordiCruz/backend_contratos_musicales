import { IntegrantesService } from './integrantes.service';
import { CreateIntegranteDto } from './dto/create-integrante.dto';
import { UpdateIntegranteDto } from './dto/update-integrante.dto';
import { FiltroIntegranteDataDto } from './dto/filtro-integrante-data.dto';
import { AsignarEspecialidadDto } from './dto/asignar-especialidad.dto';
import { AsignarVariasEspecialidadesDto } from './dto/asignar-varias-especialidades.dto';
export declare class IntegrantesController {
    private readonly integrantesService;
    constructor(integrantesService: IntegrantesService);
    create(req: any, createIntegranteDto: CreateIntegranteDto): Promise<import("./entities/integrante.entity").Integrante>;
    findAll(filters: FiltroIntegranteDataDto): Promise<import("./dto/response-integrante.dto").ResponseIntegranteDto[]>;
    findOne(id: string): Promise<import("./entities/integrante.entity").Integrante>;
    update(id: string, updateIntegranteDto: UpdateIntegranteDto): Promise<import("./dto/response-update.dto").ResponseUpdateDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createIntegranteFromExistingPersona(idPersona: string, req: any, dto: any): Promise<import("./entities/integrante.entity").Integrante>;
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
        asignadas: string[];
    }>;
    eliminarEspecialidad(id: string, idEspecialidad: string): Promise<{
        message: string;
    }>;
}
