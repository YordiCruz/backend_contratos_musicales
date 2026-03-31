import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { EstadoPago, MetodoPago, Pago, TipoPago } from "./entities/pago.entity";
import { Contrato } from "../contratos/entities/contrato.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepo: Repository<Pago>,

    @InjectRepository(Contrato)
    private readonly contratoRepo: Repository<Contrato>,
  ) {}

//   async registrarPago(dto: {
//     contratoId: string;
//     monto: number;
//     metodo: string;
//     tipo: string;
//     referencia?: string;
//     proveedor?: string;
//     transaccion_id?: string;
//     payload?: any;
//     registrado_por: any;
//   }) {
//     try {
//       const contrato = await this.contratoRepo.findOne({
//         where: { id_contrato: dto.contratoId },
//       });

//       if (!contrato) throw new NotFoundException('Contrato no encontrado');

//     const pago = this.pagoRepo.create({
//   contrato, // <-- objeto Contrato
//   monto: dto.monto,
//   metodo: dto.metodo as MetodoPago,
//   tipo: dto.tipo as TipoPago,
//   referencia: dto.referencia,
//   fecha_pago: new Date(),
//   proveedor: dto.proveedor ?? 'manual',
//   transaccion_id: dto.transaccion_id,
//   payload: dto.payload,
//   estado: EstadoPago.PENDIENTE,
//   registrado_por: dto.registrado_por,
// });

//       return await this.pagoRepo.save(pago);
//     } catch (error) {
//       throw new InternalServerErrorException(`Error al registrar el pago: ${error.message}`);
//     }
//   }

  async listarTodosPagos() {
  try {
    return await this.pagoRepo.find({ relations: ['contrato', 'registrado_por'] });
  } catch (error) {
    throw new InternalServerErrorException(`Error al listar todos los pagos: ${error.message}`);
  }
}


  async confirmarPago(id_pago: string) {
    try {
      const pago = await this.pagoRepo.findOne({ where: { id_pago } });

      if (!pago) throw new NotFoundException('Pago no encontrado');

      pago.estado = EstadoPago.PAGADO;
      return await this.pagoRepo.save(pago);
    } catch (error) {
      throw new InternalServerErrorException(`Error al confirmar el pago: ${error.message}`);
    }
  }

  async listarPagos(contratoId: string) {
    try {
      return await this.pagoRepo.find({
        where: { contrato: { id_contrato: contratoId } },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error al listar pagos: ${error.message}`);
    }
  }

  async confirmarPagoPorTransaccion(transaccion_id: string) {
    try {
      const pago = await this.pagoRepo.findOne({ where: { transaccion_id } });

      if (!pago) throw new NotFoundException('Pago no encontrado');

      pago.estado = EstadoPago.PAGADO;
      return await this.pagoRepo.save(pago);
    } catch (error) {
      throw new InternalServerErrorException(`Error al confirmar pago por transacción: ${error.message}`);
    }
  }

  async confirmarPagoSimulado(transaccion_id: string) {
    try {
      const pago = await this.pagoRepo.findOne({ where: { transaccion_id } });

      if (!pago) throw new NotFoundException('Pago no encontrado');

      pago.estado = EstadoPago.PAGADO;
      await this.pagoRepo.save(pago);

      const contrato = await this.contratoRepo.findOne({
        where: { id_contrato: pago.contrato.id_contrato },
      });

      if (contrato) {
        contrato.estado = 'pagado';
        await this.contratoRepo.save(contrato);
      }

      return {
        status: 'ok',
        mensaje: 'Pago simulado confirmado',
        transaccion_id,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error al confirmar pago simulado: ${error.message}`);
    }
  }


  async obtenerResumenContrato(contratoId: string) {
  const contrato = await this.contratoRepo.findOne({
    where: { id_contrato: contratoId },
    relations: ['pagos', 'evento'],
  });

  if (!contrato) throw new NotFoundException('Contrato no encontrado');

  const precioBase = Number(contrato.evento?.precio_base || 0);
  const totalContrato = precioBase * (contrato.horas_contratadas || 0);

  const pagadoHastaAhora = contrato.pagos
      .filter(p => p.estado === EstadoPago.PAGADO)
    .reduce((sum, p) => sum + Number(p.monto), 0);

  const montoPorPagar = totalContrato - pagadoHastaAhora;

  // Ejemplo de regla de descuento: si contrata más de 5 horas, 10% off
  let descuento = 0;
  if ((contrato.horas_contratadas || 0) >= 5) {
    descuento = totalContrato * 0.1;
  }

  return {
    contratoId,
    totalContrato,
    pagadoHastaAhora,
    montoPorPagar,
    descuento,
    horasExtra: contrato.horas_extra,
    pagos: contrato.pagos,
  };
}



async registrarPago(dto: any) {
  const contrato = await this.contratoRepo.findOne({
    where: { id_contrato: dto.contratoId },
    relations: ['pagos', 'evento'],
  });
  if (!contrato) throw new NotFoundException('Contrato no encontrado');

  const resumen = await this.obtenerResumenContrato(dto.contratoId);

  let monto = dto.monto;
  let descuento = 0;

  switch (dto.tipo) {
    case TipoPago.ADELANTO:
      if (contrato.pagos.some(p => p.tipo === TipoPago.ADELANTO)) {
        throw new InternalServerErrorException('Ya existe un adelanto registrado');
      }
      monto = resumen.totalContrato * 0.3;
      break;

    case TipoPago.SALDO:
      monto = resumen.montoPorPagar;
      break;

    case TipoPago.EXTRA:
      monto = (contrato.horas_extra || 0) * Number(contrato.evento?.precio_base || 0);
      break;
  }

  // 🔥 Regla de descuento: si horas contratadas > 3, aplica 8%
  if ((contrato.horas_contratadas || 0) > 3) {
    descuento = monto * 0.08;
  }

  const monto_final = monto - descuento;

  const pago = this.pagoRepo.create({
    contrato,
    monto,
    descuento,
    monto_final,
    metodo: dto.metodo as MetodoPago,
    tipo: dto.tipo as TipoPago,
    referencia: dto.referencia,
    fecha_pago: new Date(),
    proveedor: dto.proveedor ?? 'manual',
    transaccion_id: dto.transaccion_id,
    payload: dto.payload,
    estado: EstadoPago.PENDIENTE,
    registrado_por: dto.registrado_por,
  });

  return await this.pagoRepo.save(pago);
}




}