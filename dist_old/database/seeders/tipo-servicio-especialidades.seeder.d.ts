import { Repository } from 'typeorm';
import { TipoServicioEspecialidad } from 'src/admin/contratos/entities/tipo-servicio-especialidad.entity';
import { Especialidad } from 'src/admin/especialidades/especialidads/entities/especialidad.entity';
export declare class ServicioEspecialidadSeeder {
    private readonly servicioRepo;
    private readonly especialidadRepo;
    constructor(servicioRepo: Repository<TipoServicioEspecialidad>, especialidadRepo: Repository<Especialidad>);
    run(): Promise<void>;
}
