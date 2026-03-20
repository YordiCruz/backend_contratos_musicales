import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
export declare class EventosController {
    private readonly eventosService;
    constructor(eventosService: EventosService);
    uploadEvento(dto: CreateEventoDto, files: Express.Multer.File[]): Promise<import("./entities/evento.entity").Evento | null>;
    findAll(): Promise<import("./entities/evento.entity").Evento[]>;
    findOne(id: string): Promise<import("./entities/evento.entity").Evento | null>;
    updateEvento(id: string, dto: UpdateEventoDto, files?: Express.Multer.File[]): Promise<import("./entities/evento.entity").Evento | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
