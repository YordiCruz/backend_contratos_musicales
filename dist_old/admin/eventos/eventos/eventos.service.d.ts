import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Categoria } from '../categorias/entities/categoria.entity';
import { DataSource, Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';
import { Media } from '../media/entities/media.entity';
export declare class EventosService {
    private readonly categoriaRepo;
    private readonly repo;
    private readonly mediaRepo;
    private readonly dataSource;
    constructor(categoriaRepo: Repository<Categoria>, repo: Repository<Evento>, mediaRepo: Repository<Media>, dataSource: DataSource);
    create(dto: CreateEventoDto): Promise<Evento>;
    findAll(): Promise<Evento[]>;
    findOne(id: string): Promise<Evento | null>;
    update(id_evento: string, dto: UpdateEventoDto): Promise<Evento>;
    changeEstado(id_evento: string, estado: string): Promise<Evento>;
    remove(id_evento: string): Promise<{
        message: string;
    }>;
}
