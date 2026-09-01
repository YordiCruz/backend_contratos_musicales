import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DisponibilidadEvento } from './entities/disponibilidad-evento.entity';

@Injectable()
export class DisponibilidadEventosService {
  constructor(
    @InjectRepository(DisponibilidadEvento)
    private disponibilidadRepo: Repository<DisponibilidadEvento>,
  ) {}

  // Obtener disponibilidad por mes
  async getDisponibilidadPorMes(año: number, mes: number) {
    return this.disponibilidadRepo
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.contrato', 'contrato')
      .where('EXTRACT(YEAR FROM d.fecha) = :anio', { anio: año })
      .andWhere('EXTRACT(MONTH FROM d.fecha) = :mes', { mes })
      .getMany();
  }

  // Obtener disponibilidad por día específico
 async getDisponibilidadPorDia(fecha: Date) {
  return this.disponibilidadRepo
    .createQueryBuilder('d')
    .leftJoinAndSelect('d.contrato', 'contrato')
    .where('d.fecha::text = :fecha', { fecha: fecha.toISOString().split('T')[0] })
    .getMany();
}

  // Marcar slot como ocupado
  async marcarOcupado(fecha: Date, bloque: string, contratoId: string) {
    let slot = await this.disponibilidadRepo.findOne({ where: { fecha, bloque } });

    if (!slot) {
      slot = this.disponibilidadRepo.create({ fecha, bloque });
    }

    slot.estado = 'ocupado';
    slot.contrato = { id_contrato: contratoId } as any;

    return this.disponibilidadRepo.save(slot);
  }

  // Marcar slot como libre
  async marcarLibre(fecha: Date, bloque: string) {
    const slot = await this.disponibilidadRepo.findOne({ where: { fecha, bloque } });
    if (!slot) throw new NotFoundException('Slot no encontrado');

    slot.estado = 'libre';
    slot.contrato = null;

    return this.disponibilidadRepo.save(slot);
  }
}