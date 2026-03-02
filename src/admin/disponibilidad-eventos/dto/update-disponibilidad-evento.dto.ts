import { PartialType } from '@nestjs/swagger';
import { CreateDisponibilidadEventoDto } from './create-disponibilidad-evento.dto';

export class UpdateDisponibilidadEventoDto extends PartialType(CreateDisponibilidadEventoDto) {}
