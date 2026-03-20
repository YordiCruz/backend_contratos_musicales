import { UbicacionService } from './ubicacion.service';
import { Ubicacion } from './entities/ubicacion.entity';
export declare class UbicacionController {
    private readonly ubicacionesService;
    constructor(ubicacionesService: UbicacionService);
    create(data: Partial<Ubicacion>): Promise<Ubicacion>;
    findAll(): Promise<Ubicacion[]>;
    findOne(id: string): Promise<Ubicacion>;
    update(id: string, data: Partial<Ubicacion>): Promise<Ubicacion>;
    remove(id: string): Promise<Ubicacion>;
}
