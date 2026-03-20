import { CreateIntegranteDto } from './dto/create-integrante.dto';
import { Integrante } from './entities/integrante.entity';
import { DataSource, Repository } from 'typeorm';
import { FiltroIntegranteDataDto } from './dto/filtro-integrante-data.dto';
import { ResponseIntegranteDto } from './dto/response-integrante.dto';
import { UpdateIntegranteDto } from './dto/update-integrante.dto';
import { ResponseUpdateDto } from './dto/response-update.dto';
import { CreateIntegranteDataDto } from './dto/create-integrante-data.dto';
import { AsignarEspecialidadDto } from './dto/asignar-especialidad.dto';
import { Especialidad } from '../especialidades/especialidads/entities/especialidad.entity';
import { AsignarVariasEspecialidadesDto } from './dto/asignar-varias-especialidades.dto';
export declare class IntegrantesService {
    private readonly integranterepo;
    private readonly especialidadrepo;
    private readonly dataSource;
    constructor(integranterepo: Repository<Integrante>, especialidadrepo: Repository<Especialidad>, dataSource: DataSource);
    create(createIntegranteDto: CreateIntegranteDto, user: any): Promise<Integrante>;
    findAll(filters: FiltroIntegranteDataDto): Promise<ResponseIntegranteDto[]>;
    findOne(id: string): Promise<Integrante>;
    update(id: string, updateIntegranteDto: UpdateIntegranteDto): Promise<ResponseUpdateDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createIntegranteFromExistingPersona(idPersona: string, dto: CreateIntegranteDataDto, user: any): Promise<Integrante>;
    asignarEspecialidad(id: string, dto: AsignarEspecialidadDto): Promise<{
        message: string;
        tipo: string;
    }>;
    asignarMultiplesEspecialidades(id: string, dto: AsignarVariasEspecialidadesDto): Promise<{
        message: string;
        asignadas?: undefined;
    } | {
        message: string;
        asignadas: string[];
    }>;
    eliminarEspecialidad(id: string, id_especialidad: string): Promise<{
        message: string;
    }>;
    listaEspecialidades(id: string): Promise<{
        id: string;
        nombre: string;
        tipo: string;
    }[]>;
}
