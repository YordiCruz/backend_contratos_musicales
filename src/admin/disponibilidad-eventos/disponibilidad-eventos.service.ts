import { Injectable } from '@nestjs/common';
import { CreateDisponibilidadEventoDto } from './dto/create-disponibilidad-evento.dto';
import { UpdateDisponibilidadEventoDto } from './dto/update-disponibilidad-evento.dto';

@Injectable()
export class DisponibilidadEventosService {
  create(createDisponibilidadEventoDto: CreateDisponibilidadEventoDto) {
    return 'This action adds a new disponibilidadEvento';
  }

  findAll() {
    return `This action returns all disponibilidadEventos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} disponibilidadEvento`;
  }

  update(id: number, updateDisponibilidadEventoDto: UpdateDisponibilidadEventoDto) {
    return `This action updates a #${id} disponibilidadEvento`;
  }

  remove(id: number) {
    return `This action removes a #${id} disponibilidadEvento`;
  }
}
