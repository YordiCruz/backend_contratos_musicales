import { Repository } from 'typeorm';
import { Ubicacion } from './entities/ubicacion.entity';
export declare class UbicacionService {
    private ubicacionRepo;
    constructor(ubicacionRepo: Repository<Ubicacion>);
    create(data: Partial<Ubicacion>): Promise<Ubicacion>;
    findAll(): Promise<Ubicacion[]>;
    findOne(id: string): Promise<Ubicacion>;
    update(id: string, data: Partial<Ubicacion>): Promise<Ubicacion>;
    remove(id: string): Promise<Ubicacion>;
}
