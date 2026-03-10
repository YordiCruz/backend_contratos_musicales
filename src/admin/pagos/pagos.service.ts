import { Injectable, NotFoundException } from "@nestjs/common";
import { Pago } from "./entities/pago.entity";
import { Contrato } from "../contratos/entities/contrato.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    readonly pagoRepo: Repository<Pago>,

    @InjectRepository(Contrato)
    private readonly contratoRepo: Repository<Contrato>,
  ) {}

  async registrarPago(dto: {
    contratoId: string;
    monto: number;
    metodo: string;
    tipo: string;
    referencia?: string;
    proveedor?: string;
    transaccion_id?: string;
    payload?: any;
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
      proveedor: dto.proveedor ?? 'manual',
      transaccion_id: dto.transaccion_id,
      payload: dto.payload,
      estado: 'pendiente',
      registrado_por: dto.registrado_por,
    });

    return this.pagoRepo.save(pago);
  }

  async confirmarPago(id_pago: string) {
    const pago = await this.pagoRepo.findOne({ where: { id_pago } });

    if (!pago) throw new NotFoundException('Pago no encontrado');

    pago.estado = 'confirmado';
    return this.pagoRepo.save(pago);
  }

  async listarPagos(contratoId: string) {
    return this.pagoRepo.find({
      where: { contrato: { id_contrato: contratoId } },
    });
  }


  async confirmarPagoPorTransaccion(transaccion_id: string) {
  const pago = await this.pagoRepo.findOne({ where: { transaccion_id } });

  if (!pago) throw new NotFoundException('Pago no encontrado');

  pago.estado = 'confirmado';
  return this.pagoRepo.save(pago);
}


async confirmarPagoSimulado(transaccion_id: string) {
  // 1. Buscar el pago
  const pago = await this.pagoRepo.findOne({ where: { transaccion_id } });

  if (!pago) {
    throw new NotFoundException('Pago no encontrado');
  }

  // 2. Confirmar el pago
  pago.estado = 'confirmado';
  await this.pagoRepo.save(pago);

  // 3. Actualizar contrato (si corresponde)
  const contrato = await this.contratoRepo.findOne({
    where: { id_contrato: pago.contrato.id_contrato },
  });

  if (contrato) {
    contrato.estado = 'pagado'; // o el campo que uses
    await this.contratoRepo.save(contrato);
  }

  // 4. Retornar respuesta
  return {
    status: 'ok',
    mensaje: 'Pago simulado confirmado',
    transaccion_id,
  };
}


}