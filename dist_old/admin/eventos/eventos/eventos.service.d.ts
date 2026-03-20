import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Categoria } from '../categorias/entities/categoria.entity';
import { DataSource, Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';
import { CreateMediaDto } from '../media/dto/create-media.dto';
import { Media } from '../media/entities/media.entity';
export declare class EventosService {
    private readonly categoriaRepo;
    private readonly repo;
    private readonly mediaRepo;
    private readonly dataSource;
    constructor(categoriaRepo: Repository<Categoria>, repo: Repository<Evento>, mediaRepo: Repository<Media>, dataSource: DataSource);
    createEventoConMedia(dto: CreateEventoDto, medias: CreateMediaDto[]): Promise<Evento | null>;
    findAll(): Promise<Evento[]>;
    findOne(id: string): Promise<Evento | null>;
    updateEventoConMedia(id_evento: string, dto: UpdateEventoDto, medias?: CreateMediaDto[], replaceAll?: boolean): Promise<Evento | null>;
    remove(id_evento: string): Promise<{
        message: string;
    }>;
}
