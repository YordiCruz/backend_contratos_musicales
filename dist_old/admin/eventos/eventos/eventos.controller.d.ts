import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
export declare class EventosController {
    private readonly eventosService;
    constructor(eventosService: EventosService);
    create(dto: CreateEventoDto): Promise<import("./entities/evento.entity").Evento>;
    changeEstado(id_evento: string, estado: string): Promise<import("./entities/evento.entity").Evento>;
    findAll(): Promise<import("./entities/evento.entity").Evento[]>;
    findOne(id: string): Promise<import("./entities/evento.entity").Evento | null>;
    update(id: string, dto: UpdateEventoDto): Promise<import("./entities/evento.entity").Evento>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
