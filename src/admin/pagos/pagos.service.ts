import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';
import { Contrato } from '../contratos/entities/contrato.entity';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepo: Repository<Pago>,

    @InjectRepository(Contrato)
    private readonly contratoRepo: Repository<Contrato>,
  ) {}

  async registrarPago(dto: {
    contratoId: string;
    monto: number;
    metodo: string;
    tipo: string;
    referencia?: string;
    registrado_por: any;
  }) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: dto.contratoId },
    });

    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    const pago = this.pagoRepo.create({
      contrato,
      monto: dto.monto,
      metodo: dto.metodo,
      tipo: dto.tipo,
      referencia: dto.referencia,
      registrado_por: dto.registrado_por,
      estado: 'confirmado',
      proveedor: 'manual',
    });

    return this.pagoRepo.save(pago);
  }

  async listarPagos(contratoId: string) {
    return this.pagoRepo.find({
      where: { contrato: { id_contrato: contratoId } },
    });
  }
}