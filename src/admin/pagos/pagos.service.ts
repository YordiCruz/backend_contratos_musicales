import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { EstadoPago, MetodoPago, Pago, TipoPago } from './entities/pago.entity';
import { Contrato, EstadoContrato, estadopago } from '../contratos/entities/contrato.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Notificacione } from '../notificaciones/entities/notificacione.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { TipoNotificacion } from '../notificaciones/dto/create-notificacione.dto';
import { DisponibilidadEvento } from '../disponibilidad-eventos/entities/disponibilidad-evento.entity';
import { DatosEmpresa } from '../datos-empresa/entities/datos-empresa.entity';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepo: Repository<Pago>,

    @InjectRepository(Contrato)
    private readonly contratoRepo: Repository<Contrato>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(DatosEmpresa)
    private readonly datosEmpresaRepo: Repository<DatosEmpresa>,

    @InjectRepository(DisponibilidadEvento)
    private readonly disponibilidadRepo: Repository<DisponibilidadEvento>,

    private notificacionesService: NotificacionesService,
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
    const pagos = await this.pagoRepo.find({
      relations: {
        contrato: {
          cliente: {
            persona: true,
          },
          evento: true,
          ubicacion: true,
        },
        registrado_por: true,
      },
      order: {
        creado_en: 'DESC',
      },
    });

    const empresa = await this.datosEmpresaRepo.findOne({
  where: {},
});

    return {
      pagos,
       empresa
      };
  } catch (error: any) {
    throw new InternalServerErrorException(
      `Error al listar todos los pagos: ${error.message}`,
    );
  }
}

  async confirmarPago(id_pago: string) {
    try {
      const pago = await this.pagoRepo.findOne({ where: { id_pago } });

      if (!pago) throw new NotFoundException('Pago no encontrado');

      pago.estado = EstadoPago.APROBADO;
      return await this.pagoRepo.save(pago);
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Error al confirmar el pago: ${error.message}`,
      );
    }
  }

async solicitarAdelanto(idContrato: string, body: any) {

  const contrato = await this.contratoRepo.findOne({
    where: { id_contrato: idContrato },
    relations: ['cliente', 'evento', 'ubicacion'],
  });

  if (!contrato) {
    throw new NotFoundException('Contrato no encontrado');
  }

 

  // ======================================================
  // 2. CONTINUAR FLUJO NORMAL
  // ======================================================
  const porcentaje = Number(body.porcentaje || 30);
  const adelanto = Number(contrato.monto_final) * (porcentaje / 100);

  const user = await this.userRepo
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.cliente', 'cliente')
    .where('cliente.id = :id', {
      id: contrato.cliente.id,
    })
    .getOne();

  if (!user) {
    throw new NotFoundException('Usuario cliente no encontrado');
  }

  // ======================================================
  // 3. NOTIFICACIÓN
  // ======================================================

  const mensaje = `Para confirmar su evento "${contrato.evento.nombre}", se requiere un adelanto de Bs. ${adelanto.toFixed(2)}.`;
  await this.notificacionesService.enviar(
    await this.notificacionesService.generarNotificacion(
      TipoNotificacion.CLIENTE,
      contrato,
      user,
      mensaje,
      undefined,
      undefined,
      'ADELANTO',

    ),
  );

  // ======================================================
  // 4. ACTUALIZAR CONTRATO
  // ======================================================
  contrato.estado_pago = estadopago.ADELANTO_REQUERIDO;
  contrato.porcentaje_adelanto = porcentaje;

  await this.contratoRepo.save(contrato);

  return {
    message: 'Solicitud de adelanto enviada',
    adelanto,
  };
}


async verificarConflictos(idContrato: string) {
  const contrato = await this.contratoRepo.findOne({
    where: { id_contrato: idContrato },
  });

  if (!contrato) return [];

  return this.contratoRepo
    .createQueryBuilder('c')
    .leftJoinAndSelect('c.ubicacion', 'ubicacion')
    .leftJoinAndSelect('c.cliente', 'cliente')
    .leftJoinAndSelect('c.evento', 'evento')
    .where('c.fecha_evento::date = :fecha::date', {
      fecha: contrato.fecha_evento,
    })
    .andWhere('c.estado = :estado', {
  estado: 'aprobado',
})
    .andWhere('c.id_contrato != :id', {
      id: contrato.id_contrato,
    })
    .andWhere(
  `
    CAST(c.hora_inicio AS time) < CAST(:horaFin AS time)
    AND
    CAST(c.hora_fin AS time) > CAST(:horaInicio AS time)
  `,
  {
    horaInicio: contrato.hora_inicio,
    horaFin: contrato.hora_fin,
  },
)
    .getMany();
}





async confirmarPago2(idPago: string) {

  const pago = await this.pagoRepo.findOne({
    where: {
      id_pago: idPago,
    },
    relations: [
      'contrato',
      'contrato.cliente',
      'contrato.cliente.user',
    ],
  });

  if (!pago) {
    throw new NotFoundException(
      'Pago no encontrado',
    );
  }

  if (pago.estado === EstadoPago.APROBADO) {
    throw new BadRequestException(
      'El pago ya fue confirmado',
    );
  }

  const contrato = pago.contrato;

  const montoPago = Number(pago.monto);
  const saldoActual = Number(contrato.saldo);

  // Evitar sobrepagos
  if (montoPago > saldoActual) {
    throw new BadRequestException(
      `El pago excede el saldo pendiente (${saldoActual} Bs).`,
    );
  }

  // Aprobar pago
  pago.estado = EstadoPago.APROBADO;
  pago.fecha_pago = new Date();
  await this.pagoRepo.save(pago);

  // Actualizar contrato
  contrato.total_pagado =
    Number(contrato.total_pagado) + montoPago;

  contrato.saldo =
    Number(contrato.monto_final) -
    Number(contrato.total_pagado);

  // Evitar pequeños errores por decimales
  if (contrato.saldo < 0.01) {
    contrato.saldo = 0;
  }

  // Si terminó de pagar
  if (contrato.saldo === 0) {
    // contrato.estado = EstadoContrato.;
    contrato.estado_pago = estadopago.PAGADO_TOTAL;
  }

  contrato.estado_pago = estadopago.PAGADO_PARCIAL

  await this.contratoRepo.save(contrato);


  // ======================================================
// NOTIFICAR AL CLIENTE
// ======================================================

const mensaje = `Su pago de Bs. ${montoPago.toFixed(2)} fue validado correctamente. ${
      contrato.saldo > 0
        ? `Aún tiene un saldo pendiente de Bs. ${Number(contrato.saldo).toFixed(2)}.`
        : 'El pago de su contrato ha sido completado.'
    }`

await this.notificacionesService.enviar(
  await this.notificacionesService.generarNotificacion(
    TipoNotificacion.CLIENTE,
    contrato,
    contrato.cliente.user,
    mensaje,
    undefined,
    undefined,
    'APROBADO',
    
  ),
);

  return {
    ok: true,
    message: 'Pago confirmado correctamente.',
    pago,
    contrato,
  };
}

 

  async listarPagos(contratoId: string) {
    try {
      return await this.pagoRepo.find({
        where: { contrato: { id_contrato: contratoId } },
      });
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Error al listar pagos: ${error.message}`,
      );
    }
  }


  async confirmarPagoPorTransaccion(idPago: string) {
  try {

    const pago = await this.pagoRepo.findOne({
      where: { id_pago: idPago },
      relations: ['contrato'],
    });

    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }

    if (pago.estado === EstadoPago.APROBADO) {
      throw new BadRequestException('El pago ya fue aprobado');
    }

    const contrato = pago.contrato;

    // 1. Aprobar pago
    pago.estado = EstadoPago.APROBADO;
    await this.pagoRepo.save(pago);

    // 2. Actualizar contrato financiero
    contrato.total_pagado =
      Number(contrato.total_pagado) + Number(pago.monto);

    contrato.saldo =
      Number(contrato.monto_final) -
      Number(contrato.total_pagado);

    // 3. Marcar contrato si ya está pagado
    if (contrato.saldo === 0) {
      contrato.saldo = 0;
      contrato.estado_pago = estadopago.PAGADO_TOTAL;
    }

    await this.contratoRepo.save(contrato);

    return {
      ok: true,
      message: 'Pago confirmado correctamente',
      pago,
      contrato,
    };

  } catch (error: any) {
    throw new InternalServerErrorException(
      `Error al confirmar pago: ${error.message}`,
    );
  }
}

//   async registrarPago2(dto: any) {

//   const contrat = await this.contratoRepo.findOne({
//     where: {
//       id_contrato: dto.contratoId,
//     },
//     relations: ['pagos'],
//   });

//   if (!contrat) {
//     throw new NotFoundException('Contrato no encontrado');
//   }

//   if (Number(dto.monto) <= 0) {
//     throw new BadRequestException(
//       'El monto debe ser mayor a cero.',
//     );
//   }

//   const montoPago = Number(dto.monto);

//   // validar contra saldo actual del contrato
//   if (montoPago > Number(contrat.saldo)) {
//     throw new BadRequestException(
//       'El monto excede el saldo pendiente del contrato.',
//     );
//   }

  

//   const pago = this.pagoRepo.create({
//     contrato: contrat,
//     monto: montoPago,
//     metodo: dto.metodo,
//     tipo: dto.tipo,
//     referencia: dto.referencia,
//     proveedor: dto.proveedor ?? null,
//     registrado_por: dto.registrado_por,

//     estado: EstadoPago.APROBADO,
    

//     fecha_solicitud: new Date(),
//     fecha_pago: null,
//   });

//   await this.pagoRepo.save(pago);


// // ==========================================
// // ACTUALIZAR TOTALES DEL CONTRATO
// // ==========================================

// contrat.estado_pago = estadopago.PAGADO_PARCIAL

// contrat.total_pagado =
//   Number(contrat.total_pagado || 0) + montoPago;

// contrat.saldo =
//   Number(contrat.monto_final) - Number(contrat.total_pagado);

//   if (Number(contrat.monto_final) === Number(contrat.total_pagado) && contrat.saldo === 0) {
//     contrat.saldo = 0;
//     contrat.estado_pago = estadopago.PAGADO_TOTAL
//   }

// await this.contratoRepo.save(contrat);

// // ==========================================
// // VALIDAR SI YA SE CUMPLIÓ EL ADELANTO
// // ==========================================

// const porcentaje = Number(contrat.porcentaje_adelanto || 0);

// const minimo =
//   Number(contrat.monto_final) * (porcentaje / 100);

// if (contrat.total_pagado < minimo) {

//   return {
//     mensaje: 'Pago registrado correctamente. Pendiente de completar el adelanto.',
//     pago,
//   };

// }

// // ==========================================
// // APROBAR CONTRATO
// // ==========================================

// contrat.estado = EstadoContrato.APROBADO;

// await this.contratoRepo.save(contrat);

// // ==========================================
// // MARCAR DISPONIBILIDAD
// // ==========================================

// let disponibilidad = await this.disponibilidadRepo.findOne({
//   where: {
//     fecha: contrat.fecha_evento,
//     bloque: contrat.bloque,
//   },
// });

// if (disponibilidad) {

//   disponibilidad.estado = 'ocupado';
//   disponibilidad.contrato = contrat;

// } else {

//   disponibilidad = this.disponibilidadRepo.create({
//     fecha: contrat.fecha_evento,
//     bloque: contrat.bloque,
//     contrato: contrat,
//     estado: 'ocupado',
//   });

// }

// await this.disponibilidadRepo.save(disponibilidad);

// return {
//   mensaje: 'Pago registrado y contrato aprobado correctamente.',
//   pago,
// };

// }


async registrarPago2(dto: any) {

  const contrat = await this.contratoRepo.findOne({
    where: {
      id_contrato: dto.contratoId,
    },
  });

  if (!contrat) {
    throw new NotFoundException('Contrato no encontrado');
  }

  if (Number(dto.monto) <= 0) {
    throw new BadRequestException(
      'El monto debe ser mayor a cero.',
    );
  }

  const montoPago = Number(dto.monto);

  // validar contra saldo actual del contrato
  if (montoPago > Number(contrat.saldo)) {
    throw new BadRequestException(
      'El monto excede el saldo pendiente del contrato.',
    );
  }

  const pago = this.pagoRepo.create({
    contrato: contrat,
    monto: montoPago,
    metodo: dto.metodo,
    tipo: dto.tipo,
    referencia: dto.referencia,
    proveedor: dto.proveedor ?? null,
    registrado_por: dto.registrado_por,


    estado: EstadoPago.APROBADO,

    fecha_solicitud: null,
    fecha_pago: new Date(),
  });

  await this.pagoRepo.save(pago);

  // ==========================================
  // ACTUALIZAR TOTALES DEL CONTRATO
  // ==========================================

  contrat.estado_pago = estadopago.PAGADO_PARCIAL;

  contrat.total_pagado =
    Number(contrat.total_pagado || 0) + montoPago;

  contrat.saldo =
    Number(contrat.monto_final) - Number(contrat.total_pagado);

  if (Number(contrat.monto_final) === Number(contrat.total_pagado) && contrat.saldo === 0) {
    contrat.saldo = 0;
    contrat.estado_pago = estadopago.PAGADO_TOTAL;
  }

  // ==========================================
  // VALIDAR SI YA SE CUMPLIÓ EL ADELANTO
  // ==========================================

  const porcentaje = Number(contrat.porcentaje_adelanto || 0);

  const minimo =
    Number(contrat.monto_final) * (porcentaje / 100);

  if (contrat.total_pagado < minimo) {

    await this.contratoRepo.save(contrat);

    return {
      mensaje: 'Pago registrado correctamente. Pendiente de completar el adelanto.',
      pago,
    };

  }

  // ==========================================
  // APROBAR CONTRATO
  // ==========================================

  contrat.estado = EstadoContrato.CONFIRMADO;

  await this.contratoRepo.save(contrat); // único save para ambos campos (totales + estado)

  // ==========================================
  // MARCAR DISPONIBILIDAD
  // ==========================================

  let disponibilidad = await this.disponibilidadRepo.findOne({
    where: {
      fecha: contrat.fecha_evento,
      bloque: contrat.bloque,
    },
  });

  if (disponibilidad) {

    disponibilidad.estado = 'ocupado';
    disponibilidad.contrato = contrat;

  } else {

    disponibilidad = this.disponibilidadRepo.create({
      fecha: contrat.fecha_evento,
      bloque: contrat.bloque,
      contrato: contrat,
      estado: 'ocupado',
    });

  }

  await this.disponibilidadRepo.save(disponibilidad);

  return {
    mensaje: 'Pago registrado y contrato aprobado correctamente.',
    pago,
  };

}


  async confirmarPagoSimulado(idPago: string) {
  try {

    const pago = await this.pagoRepo.findOne({
      where: { id_pago: idPago },
      relations: ['contrato'],
    });

    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }

    if (pago.estado === EstadoPago.APROBADO) {
      throw new BadRequestException('El pago ya fue confirmado');
    }

    // aprobar pago
    pago.estado = EstadoPago.APROBADO;
    await this.pagoRepo.save(pago);

    // actualizar contrato
    const contrato = pago.contrato;

    if (contrato) {

      contrato.total_pagado =
        Number(contrato.total_pagado) + Number(pago.monto);

      contrato.saldo =
        Number(contrato.monto_final) -
        Number(contrato.total_pagado);

      if (contrato.saldo === 0) {
        contrato.saldo = 0;
        contrato.estado_pago = estadopago.PAGADO_TOTAL;
      }

      await this.contratoRepo.save(contrato);
    }

    return {
      status: 'ok',
      mensaje: 'Pago simulado confirmado correctamente',
      pago_id: pago.id_pago,
    };

  } catch (error: any) {
    throw new InternalServerErrorException(
      `Error al confirmar pago simulado: ${error.message}`,
    );
  }
}

  

  async obtenerResumenContrato(contratoId: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: contratoId },
      relations: { pagos: true, evento: true },
    });

    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    const precioBase = Number(contrato.evento?.precio_base || 0);
    const totalContrato = precioBase * (contrato.horas_contratadas || 0);

    const pagadoHastaAhora = contrato.pagos
      .filter((p) => p.estado === EstadoPago.APROBADO)
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

 
async aprobarPago(id: string) {

    const pago = await this.pagoRepo.findOne({
        where:{
            id_pago:id
        }
    });

    if(!pago){
        throw new NotFoundException();
    }

    pago.estado = EstadoPago.APROBADO;

    pago.fecha_pago = new Date();

    await this.pagoRepo.save(pago);

    return pago;

}

}
