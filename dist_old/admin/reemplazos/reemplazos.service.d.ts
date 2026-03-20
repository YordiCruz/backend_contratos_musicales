import { CreateReemplazoDto } from './dto/create-reemplazo.dto';
import { UpdateReemplazoDto } from './dto/update-reemplazo.dto';
import { Reemplazo } from './entities/reemplazo.entity';
import { DataSource, Repository } from 'typeorm';
import { FiltrosReemplazoDto } from './dto/filtros-reemplazo.dto';
import { ResponseReemplazoDto } from './dto/response-reemplazo.dto';
import { CreateReemplazoDataDto } from './dto/create-reemplazo-data.dto';
import { ResponseUpdateReemplazoDto } from './dto/response-update-reemplazo.dto';
import { Especialidad } from '../especialidades/especialidads/entities/especialidad.entity';
import { AsignarEspecialidadDto } from './dto/asignar-especialidad.dto';
import { AsignarVariasEspecialidadesDto } from './dto/asignar-varias-especialidades.dto';
export declare class ReemplazosService {
    private readonly reemplazoRepo;
    private readonly especialidadRepo;
    private readonly dataSource;
    constructor(reemplazoRepo: Repository<Reemplazo>, especialidadRepo: Repository<Especialidad>, dataSource: DataSource);
    create(createReemplazoDto: CreateReemplazoDto, user: any): Promise<Reemplazo>;
    findAll(filters: FiltrosReemplazoDto): Promise<ResponseReemplazoDto[]>;
    findOne(id: string): Promise<Reemplazo>;
    update(id: string, updateReemplazoDto: UpdateReemplazoDto): Promise<ResponseUpdateReemplazoDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createReemplazoFromExistingPersona(idPersona: string, dto: CreateReemplazoDataDto, user: any): Promise<Reemplazo>;
    asignarEspecialidad(id: string, dto: AsignarEspecialidadDto): Promise<{
        message: string;
        tipo: string;
    }>;
    asignarMultiplesEspecialidades(id: string, dto: AsignarVariasEspecialidadesDto): Promise<{
        message: string;
        asignadas?: undefined;
    } | {
        message: string;
        asignadas: (string | undefined)[];
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
