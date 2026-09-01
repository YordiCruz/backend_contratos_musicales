import {
  Injectable,
  NotFoundException,
  BadRequestException,
  forwardRef,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import {
  Contrato,
  EstadoContrato,
  estadopago,
} from './entities/contrato.entity';
import { ContratoIntegrante } from './entities/contrato-integrante.entity';
import { ContratoReemplazo } from './entities/contrato-reemplazo.entity';
import { DisponibilidadEvento } from '../disponibilidad-eventos/entities/disponibilidad-evento.entity';
import { Ubicacion } from './entities/ubicacion.entity';
import { Integrante } from '../integrantes/entities/integrante.entity';
import { Evento } from '../eventos/eventos/entities/evento.entity';
import {
  CreateContratoDto,
  CreateContratoDto2,
} from './dto/create-contrato.dto';
import { Reemplazo } from '../reemplazos/entities/reemplazo.entity';
import { TipoServicioEspecialidad } from './entities/tipo-servicio-especialidad.entity';
import { AsignarIntegranteDto } from './dto/asignar-integrante.dto';
import { Persona } from '../personas/entities/persona.entity';
import { User } from '../users/entities/user.entity';
import { TipoNotificacion } from '../notificaciones/dto/create-notificacione.dto';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import {
  InvitacionDTO,
  ResumenContratoDTO,
  SugerenciaDTO,
} from './dto/resumen-contrato.dto';
import { Notificacione } from '../notificaciones/entities/notificacione.entity';
import { EstadoPago, Pago, TipoPago } from '../pagos/entities/pago.entity';
import { DistanciaService } from './distancia.service';
import { DatosEmpresaService } from '../datos-empresa/datos-empresa.service';
import { Client } from '../clients/entities/client.entity';
import { Cron } from '@nestjs/schedule';
import { ConfirmContratoDto } from './dto/confirm-contrato.dto';
import { DatosEmpresa } from '../datos-empresa/entities/datos-empresa.entity';

@Injectable()
export class ContratosService {
  constructor(
    @InjectRepository(Contrato)
    private contratoRepo: Repository<Contrato>,

    private readonly distanciaservicio: DistanciaService,

    private readonly datosempresa: DatosEmpresaService,

    @InjectRepository(TipoServicioEspecialidad)
    private readonly tipoServicioEspecialidadRepo: Repository<TipoServicioEspecialidad>,

    @InjectRepository(Integrante)
    private readonly integranteRepo: Repository<Integrante>,

    @InjectRepository(ContratoIntegrante)
    private contratoIntegranteRepo: Repository<ContratoIntegrante>,

    @InjectRepository(ContratoReemplazo)
    private contratoReemplazoRepo: Repository<ContratoReemplazo>,

    @InjectRepository(DisponibilidadEvento)
    private disponibilidadRepo: Repository<DisponibilidadEvento>,

    @InjectRepository(Persona)
    private personaRepo: Repository<Persona>,

    @InjectRepository(Notificacione)
    private notificacioneRepo: Repository<Notificacione>,

    @InjectRepository(Reemplazo)
    private reemplazoRepo: Repository<Reemplazo>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Client)
    private clienteRepo: Repository<Client>,

    @InjectRepository(DatosEmpresa)
    private datosEmpresa: Repository<DatosEmpresa>,

    @InjectRepository(Pago)
    private pagoRepo: Repository<Pago>,

    @Inject(forwardRef(() => NotificacionesService))
    private readonly notificacionesService: NotificacionesService,

    @InjectRepository(Ubicacion) private ubicacionRepo: Repository<Ubicacion>,
    private dataSource: DataSource,
  ) {}

  // Crear contrato en estado pendiente (con ubicación incluida)
  async createContrato(data: CreateContratoDto) {
    // 1. Validar disponibilidad
    const disponibilidad = await this.disponibilidadRepo.findOne({
      where: { fecha: data.fecha_evento, bloque: data.bloque },
    });

    // if (disponibilidad && disponibilidad.estado === 'ocupado') {
    //   throw new BadRequestException('La fecha y horario ya están ocupados');
    // }

    // 2. Buscar entidades relacionadas
    const cliente = await this.dataSource
      .getRepository(Client)
      .findOne({ where: { id: data.id_cliente } });

    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    const evento = await this.dataSource
      .getRepository(Evento)
      .findOne({ where: { id_evento: data.id_evento } });

    if (!evento) throw new NotFoundException('Evento no encontrado');

    const ubicacion = await this.ubicacionRepo.findOne({
      where: { id_ubicacion: data.id_ubicacion },
    });

    if (!ubicacion) throw new NotFoundException('Ubicación no encontrada');

    // generar numero de contrato
    const year = new Date().getFullYear();

    const ultimoContrato = await this.contratoRepo.findOne({
      where: {},
      order: {
        creado_en: 'DESC',
      },
    });

    let correlativo = 1;

    if (ultimoContrato?.numero_contrato) {
      const partes = ultimoContrato.numero_contrato.split('-');

      correlativo = Number(partes[2]) + 1;
    }

    const numeroContrato = `CT-${year}-${String(correlativo).padStart(4, '0')}`;

    //crear contrato
    const precioOriginal = data.precio_original;
    const porcentajeDescuento = data.descuento || 0;

    const descuento = precioOriginal * (porcentajeDescuento / 100);
    const montoTotal = precioOriginal - descuento;

    const contrato = this.contratoRepo.create({
      numero_contrato: numeroContrato,
      cliente,
      evento,
      ubicacion,
      fecha_evento: data.fecha_evento,
      bloque: data.bloque,
      hora_inicio: data.hora_inicio,
      hora_fin: data.hora_fin,
      tipo_servicio: data.tipo_servicio,
      horas_contratadas: data.horas_contratadas,
      estado: EstadoContrato.PENDIENTE,

      cliente_acepto_contrato: data.cliente_acepto_contrato ?? false,

      estado_pago: estadopago.SIN_SOLICITAR,
      precio_original: precioOriginal,
      porcentaje_descuento: porcentajeDescuento,
      descuento,
      monto_final: montoTotal,
      total_pagado: 0,
      saldo: montoTotal,
    });

    await this.contratoRepo.save(contrato);

    // 4. Notificar a ADMIN (YA CON USER, NO PERSONA)

    const admins = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('LOWER(role.nombre) = LOWER(:rol)', { rol: 'ADMIN' })
      .getMany();

    for (const admin of admins) {
      // 🔥 ya no existe persona
      const notifDto = await this.notificacionesService.generarNotificacion(
        TipoNotificacion.ADMIN,
        contrato,
        admin, // 👈 ahora pasas USER directamente
      );

      await this.notificacionesService.enviar(notifDto);
    }

    return contrato;
  }

 
  async createContrato2(data: CreateContratoDto2) {
  return await this.dataSource.transaction(async (manager) => {

    // =====================================================
    // Buscar cliente
    // =====================================================

    const cliente = await manager.findOne(Client, {
      where: { id: data.id_cliente },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    // =====================================================
    // Buscar evento
    // =====================================================

    const evento = await manager.findOne(Evento, {
      where: { id_evento: data.id_evento },
    });

    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }

    // =====================================================
    // Buscar ubicación
    // =====================================================

    const ubicacion = await manager.findOne(Ubicacion, {
      where: { id_ubicacion: data.id_ubicacion },
    });

    if (!ubicacion) {
      throw new NotFoundException('Ubicación no encontrada');
    }

    // =====================================================
    // Generar número de contrato
    // =====================================================

    const year = new Date().getFullYear();

    const contratos = await manager.find(Contrato, {
      order: {
        creado_en: 'DESC',
      },
      take: 1,
    });

    const ultimoContrato = contratos[0];

    let correlativo = 1;

    if (ultimoContrato?.numero_contrato) {
      const partes = ultimoContrato.numero_contrato.split('-');
      correlativo = Number(partes[2]) + 1;
    }

    const numeroContrato = `CT-${year}-${String(correlativo).padStart(4, '0')}`;

    // =====================================================
    // Calcular montos
    // =====================================================

    const precioOriginal = data.precio_original;

    const porcentajeDescuento = data.porcentaje_descuento || 0;

    const descuento =
      precioOriginal * (porcentajeDescuento / 100);

    const montoFinal =
      precioOriginal - descuento;

    // =====================================================
    // Crear contrato
    // =====================================================

    const contrato = manager.create(Contrato, {

      numero_contrato: numeroContrato,

      cliente,

      evento,

      ubicacion,

      fecha_evento: data.fecha_evento,

      bloque: data.bloque,

      hora_inicio: data.hora_inicio,

      hora_fin: data.hora_fin,

      tipo_servicio: data.tipo_servicio,

      horas_contratadas: data.horas_contratadas,

      estado: EstadoContrato.CONFIRMADO,

      admin_aprobacion: true,

      estado_pago: estadopago.ADELANTO_REQUERIDO,

      precio_original: precioOriginal,

      porcentaje_descuento: porcentajeDescuento,

      porcentaje_adelanto: data.porcentaje_adelanto,

      descuento,

      monto_final: montoFinal,

      total_pagado: 0,

      saldo: montoFinal,

      cliente_acepto_contrato: data.cliente_acepto_contrato,

      cliente_motivo_cancelacion:
        data.cliente_motivo_cancelacion,

    });

    // =====================================================
    // Estado del contrato del cliente
    // =====================================================

    if (data.cliente_acepto_contrato) {

      contrato.cliente_fecha_aceptacion = new Date();

      contrato.cliente_contrato_estado =
        'CONTRATO_ACEPTADO_CLIENTE';

    } else {

      contrato.cliente_contrato_estado =
        'CONTRATO_RECHAZADO_CLIENTE';

    }

    // =====================================================
    // Guardar contrato
    // =====================================================

    const contratoGuardado =
      await manager.save(Contrato, contrato);

    // =====================================================
    // Marcar disponibilidad
    // =====================================================

    let disponibilidad =
      await manager.findOne(DisponibilidadEvento, {

        where: {
          fecha: contratoGuardado.fecha_evento,
          bloque: contratoGuardado.bloque,
        },

      });

    if (disponibilidad) {

      disponibilidad.estado = 'ocupado';
      disponibilidad.contrato = contratoGuardado;

    } else {

      disponibilidad = manager.create(
        DisponibilidadEvento,
        {

          fecha: contratoGuardado.fecha_evento,

          bloque: contratoGuardado.bloque,

          estado: 'ocupado',

          contrato: contratoGuardado,

        },
      );

    }

    await manager.save(
      DisponibilidadEvento,
      disponibilidad,
    );

    // =====================================================
    // Respuesta
    // =====================================================

    const contratoCompleto = await manager.findOne(Contrato, {
  where: {
    id_contrato: contratoGuardado.id_contrato,
  },
  relations: {
    cliente: {
      persona: true,
    },
    evento: true,
    ubicacion: true,
  },
});

if (!contratoCompleto) {
  throw new InternalServerErrorException(
    'No se pudo recuperar el contrato recién creado.'
  );
}

return contratoCompleto;

  });
}

  

  @Cron(' */30 * * * *')
  async verificarContratos() {
    console.log('⏰ Verificando contratos...');

    await this.actualizarEstadosAutomaticos();
  }

  async actualizarEstadosAutomaticos() {
    const contratos = await this.contratoRepo.find();

    const ahora = new Date();

    for (const contrato of contratos) {
      // Evitar reprocesar contratos ya cerrados
      if (
        contrato.estado === EstadoContrato.CANCELADO ||
        contrato.estado === EstadoContrato.FINALIZADO ||
        contrato.estado === EstadoContrato.FINALIZADO_PENDIENTE_PAGO
      ) {
        continue;
      }

      // Combinar fecha + hora fin
      const fechaFin = new Date(
        `${contrato.fecha_evento}T${contrato.hora_fin}`,
      );

      // Si el evento terminó
      if (ahora >= fechaFin) {
        contrato.estado =
          Number(contrato.saldo) <= 0
            ? EstadoContrato.FINALIZADO
            : EstadoContrato.FINALIZADO_PENDIENTE_PAGO;

        await this.contratoRepo.save(contrato);

        console.log(
          `✅ Contrato ${contrato.id_contrato} actualizado a ${contrato.estado}`,
        );
      }
    }
  }

  async getAllContratos() {
    const contratos = await this.contratoRepo
  .createQueryBuilder('contrato')

  .leftJoinAndSelect('contrato.cliente', 'cliente')
  .leftJoinAndSelect('cliente.persona', 'persona')

  .leftJoinAndSelect('contrato.evento', 'evento')
  .leftJoinAndSelect('contrato.ubicacion', 'ubicacion')

  .orderBy(
    `
    CASE
      WHEN contrato.estado = 'finalizado' THEN 1
      ELSE 0
    END
    `,
    'ASC',
  )
  .addOrderBy('contrato.creado_en', 'DESC')
  .getMany();

    const empresa = await this.datosEmpresa.findOne({
      where: {},
    });

    return { contratos, empresa };
  }

  // Obtener contrato con todas sus relaciones
  async getContrato(id: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: id },
      relations: {
        cliente: { persona: true },
        evento: true,
        ubicacion: true,
        integrantes: {
          integrante: {
            user: true,
          },
        },
        reemplazos: {
          reemplazo: {
            user: true,
          },
        },
        pagos: true,
      },
    });

    if (!contrato) throw new NotFoundException('Contrato no encontrado');
    return contrato;
  }

  // Confirmar contrato (solo integrantes, no reemplazos)
  async confirmarContrato(contratoId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Obtener contrato
      const contrato = await queryRunner.manager.findOne(Contrato, {
        where: { id_contrato: contratoId },
        relations: {
          ubicacion: true,
          evento: true,
          cliente: { persona: true },
        },
      });
      if (!contrato) throw new NotFoundException('Contrato no encontrado');

      // 2. Validar disponibilidad
      const disponibilidad = await queryRunner.manager.findOne(
        DisponibilidadEvento,
        {
          where: { fecha: contrato.fecha_evento, bloque: contrato.bloque },
        },
      );

      if (disponibilidad?.estado === 'ocupado') {
        await queryRunner.rollbackTransaction();
        return { estado: 'pendiente', mensaje: 'Fecha y bloque ocupados' };
      }

      // 3. Especialidades requeridas
      const especialidadesRequeridas = await queryRunner.manager.find(
        TipoServicioEspecialidad,
        {
          where: { tipo_servicio: contrato.tipo_servicio },
          relations: { especialidad: true },
        },
      );

      // 4. Integrantes aceptados
      const contratoIntegrantes = await queryRunner.manager.find(
        ContratoIntegrante,
        {
          where: { contrato: { id_contrato: contratoId }, estado: 'aceptado' },
          relations: { integrante: { user: true } },
        },
      );

      // 5. Reemplazos aceptados
      const contratoReemplazos = await queryRunner.manager.find(
        ContratoReemplazo,
        {
          where: { contrato: { id_contrato: contratoId }, estado: 'aceptado' },
          relations: { reemplazo: { user: true } },
        },
      );

      // 6. Validar cobertura
      let faltantes: { especialidad: string; estado: string }[] = [];
      let cobertura: {
        especialidad: string;
        estado: string;
        tipo: string;
        nombre: string;
      }[] = [];

      for (const esp of especialidadesRequeridas) {
        const nombreEsp = esp.especialidad.nombre.toLowerCase();
        let cubierta = false;

        // Integrantes aceptados
        const integrante = contratoIntegrantes.find(
          (ci) => ci.especialidad.toLowerCase() === nombreEsp,
        );

        if (integrante) {
          cubierta = true;
          cobertura.push({
            especialidad: esp.especialidad.nombre,
            estado: 'cubierta',
            tipo: 'integrante',
            nombre: integrante.integrante?.user
              ? `${integrante.integrante.user.persona?.nombre} ${integrante.integrante.user.persona?.apellido}`
              : 'Persona no encontrada',
          });
          continue;
        }

        // Reemplazos aceptados (solo la especialidad aceptada)
        const reemplazo = contratoReemplazos.find(
          (cr) => cr.especialidad.toLowerCase() === nombreEsp,
        );

        if (reemplazo) {
          cubierta = true;
          cobertura.push({
            especialidad: esp.especialidad.nombre,
            estado: 'cubierta',
            tipo: 'reemplazo',
            nombre: reemplazo.reemplazo?.user
              ? `${reemplazo.reemplazo.user.persona?.nombre} ${reemplazo.reemplazo.user.persona?.apellido}`
              : 'Persona no encontrada',
          });
          continue;
        }

        // Si no está cubierta
        if (!cubierta) {
          faltantes.push({
            especialidad: esp.especialidad.nombre,
            estado: 'faltante',
          });
        }
      }

      // 7. Si hay faltantes → buscar reemplazos sugeridos
      if (faltantes.length > 0) {
        const posiblesReemplazos = {};

        for (const f of faltantes) {
          const candidatos = await queryRunner.manager.find(Reemplazo, {
            where: { estado: 'activo', disponible: true },
            relations: {
              user: true,
              especialidadesAsignadas: { especialidad: true },
            },
          });

          posiblesReemplazos[f.especialidad] = candidatos
            .filter((r) =>
              (r.especialidadesAsignadas ?? []).some(
                (e) =>
                  e.especialidad.nombre.toLowerCase() ===
                  f.especialidad.toLowerCase(),
              ),
            )
            .map((r) => ({
              id_reemplazo: r.id,
              nombre: `${r.user.persona?.nombre} ${r.user.persona?.apellido}`,
              especialidad: f.especialidad,
              tarifa_base_hora: r.tarifa_base_hora,
              moneda: r.moneda,
            }));
        }

        await queryRunner.rollbackTransaction();
        return {
          estado: 'pendiente',
          cobertura,
          faltantes,
          posibles_reemplazos: posiblesReemplazos,
          mensaje:
            'Contrato pendiente: faltan especialidades críticas por cubrir',
        };
      }

      // 8. Validar pago de adelanto
      const pagoAdelanto = await queryRunner.manager.findOne(Pago, {
        where: {
          contrato: { id_contrato: contratoId },
          tipo: TipoPago.ADELANTO,
        },
      });

      if (!pagoAdelanto) {
        await queryRunner.rollbackTransaction();
        return {
          estado: 'pendiente',
          mensaje: 'Contrato pendiente: falta pago de adelanto',
        };
      }

      // 9. Validar aprobación admin
      if (!contrato.admin_aprobacion) {
        await queryRunner.rollbackTransaction();
        return {
          estado: 'pendiente',
          mensaje: 'Contrato pendiente: falta aprobación del administrador',
        };
      }

      // 10. Confirmar contrato
      contrato.estado = EstadoContrato.CONFIRMADO;
      await queryRunner.manager.save(contrato);

      // 11. Guardar disponibilidad
      const slot =
        disponibilidad ??
        queryRunner.manager.create(DisponibilidadEvento, {
          fecha: contrato.fecha_evento,
          bloque: contrato.bloque,
        });

      slot.estado = 'ocupado';
      slot.contrato = contrato;
      await queryRunner.manager.save(slot);

      await queryRunner.commitTransaction();

      return {
        estado: contrato.estado,
        cobertura,
        mensaje:
          'Contrato confirmado: todas las especialidades están cubiertas',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async aprobarContrato(idContrato: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: idContrato },
      relations: ['cliente', 'evento'],
    });

    if (!contrato) {
      throw new NotFoundException('Contrato no encontrado');
    }

    // ======================================================
    // 1. VALIDAR ADELANTO
    // ======================================================
    const porcentaje = Number(contrato.porcentaje_adelanto || 0);

    const minimo = Number(contrato.monto_final) * (porcentaje / 100);

    if (Number(contrato.total_pagado) < minimo) {
      throw new BadRequestException(
        `Debe haber pagado al menos ${minimo.toFixed(2)} Bs (${porcentaje}%).`,
      );
    }

    // ======================================================
    // 2. APROBAR CONTRATO
    // ======================================================
    contrato.admin_aprobacion = true;
    contrato.estado = EstadoContrato.CONFIRMADO;

    await this.contratoRepo.save(contrato);

    // ======================================================
    // 3. MARCAR DISPONIBILIDAD
    // ======================================================
    let disponibilidad = await this.disponibilidadRepo.findOne({
      where: {
        fecha: contrato.fecha_evento,
        bloque: contrato.bloque,
      },
    });

    if (disponibilidad) {
      disponibilidad.estado = 'ocupado';
      disponibilidad.contrato = contrato;
    } else {
      disponibilidad = this.disponibilidadRepo.create({
        fecha: contrato.fecha_evento,
        bloque: contrato.bloque,
        contrato,
        estado: 'ocupado',
      });
    }

    await this.disponibilidadRepo.save(disponibilidad);

    // ======================================================
    // 4. NOTIFICAR AL CLIENTE
    // ======================================================
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

    const fechaEvento = new Intl.DateTimeFormat('es-BO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(contrato.fecha_evento));

    const mensaje = `Su evento "${contrato.evento.nombre}" ha sido confirmado exitosamente. Lo esperamos el ${fechaEvento}. ¡Gracias por elegirnos!`;

    await this.notificacionesService.enviar(
      await this.notificacionesService.generarNotificacion(
        TipoNotificacion.CLIENTE,
        contrato,
        user,
        mensaje,
        undefined,
        undefined,
        'APROBADO',
      ),
    );

    return {
      message: 'Contrato aprobado correctamente',
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

  async reabrirContrato(id: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: id },
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    if (contrato.estado !== EstadoContrato.CANCELADO) {
      throw new BadRequestException(
        'Solo se pueden reabrir contratos rechazados o cancelados',
      );
    }
    contrato.estado = EstadoContrato.PENDIENTE;
    return this.contratoRepo.save(contrato);
  }

  // async rechazarContrato(id: string, motivo?: string) {
  //   const contrato = await this.contratoRepo.findOne({
  //     where: { id_contrato: id },
  //   });
  //   if (!contrato) throw new NotFoundException('Contrato no encontrado');

  //   contrato.estado = 'rechazado';
  //   contrato.motivo_cancelacion = motivo ?? 'No especificado';
  //   return this.contratoRepo.save(contrato);
  // }
  //

  async rechazarcontrato(idContrato: string) {
    // 🔥 buscar contrato

    const contrato = await this.contratoRepo.findOne({
      where: {
        id_contrato: idContrato,
      },

      relations: ['cliente', 'evento', 'ubicacion'],
    });

    if (!contrato) {
      throw new NotFoundException('Contrato no encontrado');
    }

    // 🔥 cambiar estado

    contrato.estado = EstadoContrato.RECHAZADO;

    await this.contratoRepo.save(contrato);

    // 🔥 buscar user asociado al cliente

    const user = await this.userRepo

      .createQueryBuilder('user')

      .leftJoinAndSelect('user.cliente', 'cliente')

      .where('cliente.id = :id', {
        id: contrato.cliente.id,
      })

      .getOne();

    console.log('USER:', user);

    if (!user) {
      throw new NotFoundException('Usuario cliente no encontrado');
    }

    // 🔥 generar notificación

    const mensaje = `Lamentamos informarle que no contamos con disponibilidad para la fecha solicitada de su evento "${contrato.evento.nombre}".`;

    const dto = await this.notificacionesService.generarNotificacion(
      TipoNotificacion.CLIENTE,

      contrato,

      user,

      mensaje,

      undefined,
      undefined,

      'RECHAZADO',
    );

    // 🔥 enviar notificación

    await this.notificacionesService.enviar(dto);

    return {
      message: 'Contrato rechazado correctamente',
    };
  }

  // aceptarInvitacion Integrante en Contrato
  async aceptarInvitacion(contratoId: string, userId: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: contratoId },
    });
    const integrante = await this.integranteRepo.findOne({
      where: { user: { id: userId } },
      relations: {
        especialidadesAsignadas: { especialidad: true },
        user: true,
      },
    });

    if (!contrato || !integrante) {
      throw new Error('Contrato o integrante no encontrado');
    }

    // 1. Especialidad primaria
    const especialidadPrimaria = integrante.especialidadesAsignadas.find(
      (e) => e.tipo === 'primario',
    );

    // 2. Horas contratadas (del contrato)
    const horasContratadas = contrato.horas_contratadas; // ajusta según tu entity Contrato

    // 3. Sueldo base del integrante
    const sueldoBase = integrante.tarifa_base_hora; // ajusta según tu entity Integrante

    // 4. Calcular compensación
    const compensacionHora = horasContratadas * sueldoBase;

    // 5. Crear o actualizar registro
    let registro = await this.contratoIntegranteRepo.findOne({
      where: { id_contrato: contratoId, id_integrante: integrante.id },
    });

    if (!registro) {
      registro = this.contratoIntegranteRepo.create({
        id_contrato: contratoId,
        id_integrante: integrante.id,
        especialidad: especialidadPrimaria?.especialidad.nombre ?? 'N/A',
        compensacion_hora: compensacionHora,
        horas_contratadas: horasContratadas,
        estado: 'aceptado',
      });
    } else {
      registro.estado = 'aceptado';
      registro.especialidad =
        especialidadPrimaria?.especialidad.nombre ?? registro.especialidad;
      registro.compensacion_hora = compensacionHora;
      registro.horas_contratadas = horasContratadas;
    }

    await this.contratoIntegranteRepo.save(registro);

    // 6. Actualizar notificación correspondiente
    const notificacion = await this.notificacioneRepo.findOne({
      where: { contrato: { id_contrato: contratoId }, user: { id: userId } },
    });

    if (notificacion) {
      notificacion.estado = 'aceptado';
      await this.notificacioneRepo.save(notificacion);
    }

    // Generar resumen actualizado
    const resumen = await this.getResumenContrato(contratoId);

    const notificacionAdmin =
      await this.notificacionesService.generarNotificacion(
        TipoNotificacion.ADMIN_RESUMEN,
        contrato,
        integrante.user,
        undefined,
        resumen,
      );

    await this.notificacioneRepo.save(
      this.notificacioneRepo.create(notificacionAdmin),
    );

    return resumen;
  }

  // rechazarInvitacion Integrante en Contrato

  async rechazarInvitacion(contratoId: string, userId: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: contratoId },
    });
    const integrante = await this.integranteRepo.findOne({
      where: { user: { id: userId } },
      relations: {
        especialidadesAsignadas: { especialidad: true },
        user: true,
      },
    });

    if (!contrato || !integrante) {
      throw new Error('Contrato o integrante no encontrado');
    }

    // 1. Especialidad primaria
    const especialidadPrimaria = integrante.especialidadesAsignadas.find(
      (e) => e.tipo === 'primario',
    );

    // 2. Horas contratadas (del contrato)
    const horasContratadas = contrato.horas_contratadas;

    // 3. Sueldo base del integrante
    const sueldoBase = integrante.tarifa_base_hora;

    // 4. Calcular compensación (aunque rechace, puedes guardar el cálculo o poner 0 según tu lógica)
    const compensacionHora = horasContratadas * sueldoBase;

    // 5. Crear o actualizar registro
    let registro = await this.contratoIntegranteRepo.findOne({
      where: { id_contrato: contratoId, id_integrante: integrante.id },
    });

    if (!registro) {
      registro = this.contratoIntegranteRepo.create({
        id_contrato: contratoId,
        id_integrante: integrante.id,
        especialidad: especialidadPrimaria?.especialidad.nombre ?? 'N/A',
        compensacion_hora: compensacionHora,
        horas_contratadas: horasContratadas,
        estado: 'rechazado',
      });
    } else {
      registro.estado = 'rechazado';
      registro.especialidad =
        especialidadPrimaria?.especialidad.nombre ?? registro.especialidad;
      registro.compensacion_hora = compensacionHora;
      registro.horas_contratadas = horasContratadas;
    }

    await this.contratoIntegranteRepo.save(registro);

    // 6. Actualizar notificación correspondiente
    const notificacion = await this.notificacioneRepo.findOne({
      where: { contrato: { id_contrato: contratoId }, user: { id: userId } },
    });

    if (notificacion) {
      notificacion.estado = 'rechazado';
      await this.notificacioneRepo.save(notificacion);
    }

    return registro;
  }

  // aceptarInvitacion Reemplazo en Contrato
  async aceptarInvitacionReemplazo(contratoId: string, userId: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: contratoId },
    });
    const reemplazo = await this.reemplazoRepo.findOne({
      where: { user: { id: userId } },
      relations: {
        user: true,
        especialidadesAsignadas: {
          especialidad: true,
        },
      },
    });

    if (!contrato || !reemplazo) {
      throw new Error('Contrato o reemplazo no encontrado');
    }

    // 1. Especialidad primaria
    const especialidadPrimaria = reemplazo.especialidadesAsignadas.find(
      (e) => e.tipo === 'primario',
    );

    // 2. Horas contratadas (del contrato)
    const horasContratadas = contrato.horas_contratadas; // ajusta según tu entity Contrato

    // 3. Sueldo base del integrante
    const sueldoBase = reemplazo.tarifa_base_hora; // ajusta según tu entity Integrante

    // 4. Calcular compensación
    const compensacionHora = horasContratadas * sueldoBase;

    // 5. Crear o actualizar registro
    let registro = await this.contratoReemplazoRepo.findOne({
      where: { id_contrato: contratoId, id_reemplazo: reemplazo.id },
    });

    if (!registro) {
      registro = this.contratoReemplazoRepo.create({
        id_contrato: contratoId,
        id_reemplazo: reemplazo.id,
        especialidad: especialidadPrimaria?.especialidad.nombre ?? 'N/A',
        compensacion_hora: compensacionHora,
        horas_contratadas: horasContratadas,
        estado: 'aceptado',
      });
    } else {
      registro.estado = 'aceptado';
      registro.especialidad =
        especialidadPrimaria?.especialidad.nombre ?? registro.especialidad;
      registro.compensacion_hora = compensacionHora;
      registro.horas_contratadas = horasContratadas;
    }

    await this.contratoReemplazoRepo.save(registro);

    // 6. Actualizar notificación correspondiente
    const notificacion = await this.notificacioneRepo.findOne({
      where: { contrato: { id_contrato: contratoId }, user: { id: userId } },
    });

    if (notificacion) {
      notificacion.estado = 'aceptado';
      await this.notificacioneRepo.save(notificacion);
    }

    // Generar resumen actualizado
    const resumen = await this.getResumenContrato(contratoId);

    const notificacionAdmin =
      await this.notificacionesService.generarNotificacion(
        TipoNotificacion.ADMIN_RESUMEN,
        contrato,
        reemplazo.user,
        undefined,
        resumen,
      );

    await this.notificacioneRepo.save(
      this.notificacioneRepo.create(notificacionAdmin),
    );

    return resumen;
  }

  // rechazarInvitacion Reemplazo en Contrato
  async rechazarInvitacionReemplazo(contratoId: string, userId: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: contratoId },
    });
    const reemplazo = await this.reemplazoRepo.findOne({
      where: { user: { id: userId } },
      relations: {
        user: true,
        especialidadesAsignadas: {
          especialidad: true,
        },
      },
    });

    if (!contrato || !reemplazo) {
      throw new Error('Contrato o reemplazo no encontrado');
    }

    // 1. Especialidad primaria
    const especialidadPrimaria = reemplazo.especialidadesAsignadas.find(
      (e) => e.tipo === 'primario',
    );

    // 2. Horas contratadas (del contrato)
    const horasContratadas = contrato.horas_contratadas;

    // 3. Sueldo base del integrante
    const sueldoBase = reemplazo.tarifa_base_hora;

    // 4. Calcular compensación (aunque rechace, puedes guardar el cálculo o poner 0 según tu lógica)
    const compensacionHora = horasContratadas * sueldoBase;

    // 5. Crear o actualizar registro
    let registro = await this.contratoReemplazoRepo.findOne({
      where: { id_contrato: contratoId, id_reemplazo: reemplazo.id },
    });

    if (!registro) {
      registro = this.contratoReemplazoRepo.create({
        id_contrato: contratoId,
        id_reemplazo: reemplazo.id,
        especialidad: especialidadPrimaria?.especialidad.nombre ?? 'N/A',
        compensacion_hora: compensacionHora,
        horas_contratadas: horasContratadas,
        estado: 'rechazado',
      });
    } else {
      registro.estado = 'rechazado';
      registro.especialidad =
        especialidadPrimaria?.especialidad.nombre ?? registro.especialidad;
      registro.compensacion_hora = compensacionHora;
      registro.horas_contratadas = horasContratadas;
    }

    await this.contratoReemplazoRepo.save(registro);

    // 6. Actualizar notificación correspondiente
    const notificacion = await this.notificacioneRepo.findOne({
      where: { contrato: { id_contrato: contratoId }, user: { id: userId } },
    });

    if (notificacion) {
      notificacion.estado = 'rechazado';
      await this.notificacioneRepo.save(notificacion);
    }

    return registro;
  }

  //Tu función actual (asignarIntegranteAlContrato) permite que el admin decida si un integrante entra como aceptado o pendiente directamente. Pero en la práctica, lo correcto es que el admin solo cree la invitación (estado "pendiente") y luego el integrante/reemplazo reciba la notificación para aceptar o rechazar

  async asignarIntegranteAlContrato(
    contratoId: string,
    dto: AsignarIntegranteDto,
  ): Promise<Contrato> {
    // 🔹 Validar contrato
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: contratoId },
      relations: { integrantes: true },
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    // 🔹 Validar integrante
    const integranteEntity = await this.dataSource
      .getRepository(Integrante)
      .findOne({
        where: { id: dto.id_integrante },
        relations: {
          user: true,
          especialidadesAsignadas: {
            especialidad: true,
          },
        },
      });
    if (!integranteEntity)
      throw new NotFoundException('Integrante no encontrado');

    // 🔹 Buscar especialidad primaria
    const especialidadAsignada = integranteEntity.especialidadesAsignadas.find(
      (e) => e.tipo === 'primario',
    );
    if (!especialidadAsignada) {
      throw new BadRequestException(
        'El integrante no tiene especialidad primaria asignada',
      );
    }

    // 🔹 Validar contra tipo_servicio
    const especialidadesRequeridas = await this.dataSource
      .getRepository(TipoServicioEspecialidad)
      .find({
        where: { tipo_servicio: contrato.tipo_servicio },
        relations: { especialidad: true },
      });

    const especialidadValida = especialidadesRequeridas.some(
      (esp) => esp.especialidad.id === especialidadAsignada.especialidad.id,
    );

    if (!especialidadValida) {
      throw new BadRequestException(
        `La especialidad primaria ${especialidadAsignada.especialidad.nombre} no corresponde al tipo de servicio ${contrato.tipo_servicio}`,
      );
    }

    // 🔹 Crear relación en tabla intermedia
    const contratoIntegrante = this.contratoIntegranteRepo.create({
      id_contrato: contrato.id_contrato,
      id_integrante: integranteEntity.id,
      contrato,
      integrante: integranteEntity,
      especialidad: especialidadAsignada.especialidad.nombre,
      compensacion_hora:
        (integranteEntity?.tarifa_base_hora ?? 0) *
        (dto.horas_contratadas ?? contrato.horas_contratadas),
      horas_contratadas: dto.horas_contratadas ?? contrato.horas_contratadas,
      estado: dto.aceptado ? 'aceptado' : 'pendiente',
    });

    await this.contratoIntegranteRepo.save(contratoIntegrante);

    // 🔹 Devolver contrato actualizado
    const contratoActualizado = await this.contratoRepo.findOne({
      where: { id_contrato: contratoId },
      relations: {
        integrantes: {
          integrante: {
            user: true,
          },
        },
      },
    });

    if (!contratoActualizado) {
      throw new NotFoundException(
        'Contrato no encontrado después de asignar integrante',
      );
    }

    return contratoActualizado;
  }

  // Registrar reemplazo (solo si un integrante falla)
  async asignarReemplazoAlContrato(data: {
    id_contrato: string;
    id_reemplazo: string;
    id_especialidad: string;
    horas_contratadas?: number;
    aceptado?: boolean;
  }) {
    // 🔹 Validar contrato
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: data.id_contrato },
      relations: { integrantes: true },
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    // 🔹 Validar que el contrato esté confirmado
    if (contrato.estado !== EstadoContrato.CONFIRMADO) {
      throw new BadRequestException(
        'Solo se pueden asignar reemplazos a contratos confirmados',
      );
    }

    // 🔹 Validar reemplazo
    const reemplazoEntity = await this.dataSource
      .getRepository(Reemplazo)
      .findOne({
        where: { id: data.id_reemplazo },
        relations: {
          user: true,
          especialidadesAsignadas: {
            especialidad: true,
          },
        },
      });
    if (!reemplazoEntity)
      throw new NotFoundException('Reemplazo no encontrado');

    // 🔹 Validar disponibilidad
    if (!reemplazoEntity.disponible) {
      throw new BadRequestException(
        'El reemplazo no está disponible actualmente',
      );
    }

    // 🔹 Buscar especialidad asignada
    const especialidadAsignada = reemplazoEntity.especialidadesAsignadas.find(
      (e) => e.especialidad.id === data.id_especialidad,
    );
    if (!especialidadAsignada) {
      throw new BadRequestException(
        'El reemplazo no tiene la especialidad indicada',
      );
    }

    // 🔹 Crear relación en tabla intermedia
    const contratoReemplazo = this.contratoReemplazoRepo.create({
      id_contrato: contrato.id_contrato,
      id_reemplazo: reemplazoEntity.id,
      contrato,
      reemplazo: reemplazoEntity,
      especialidad: especialidadAsignada.especialidad.nombre,
      compensacion_hora:
        (reemplazoEntity?.tarifa_base_hora ?? 0) *
        (data.horas_contratadas ?? contrato.horas_contratadas),
      horas_contratadas: data.horas_contratadas ?? contrato.horas_contratadas,
      estado: data.aceptado ? 'aceptado' : 'pendiente', // 🔹 nuevo campo
    });

    await this.contratoReemplazoRepo.save(contratoReemplazo);

    // 🔹 Devolver contrato actualizado con reemplazos
    return this.contratoRepo.findOne({
      where: { id_contrato: data.id_contrato },
      relations: { reemplazos: { reemplazo: { user: true } } },
    });
  }

  async obtenerContratoConIntegrantes(id_contrato: string): Promise<Contrato> {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato },
      relations: {
        integrantes: {
          integrante: {
            user: true,
          },
        },
      },
    });

    if (!contrato) {
      throw new NotFoundException('Contrato no encontrado');
    }

    return contrato;
  }

  // Actualizar contrato
  async updateContrato(id: string, data: Partial<Contrato>) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: id },
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    Object.assign(contrato, data);
    return this.contratoRepo.save(contrato);
  }

  // Eliminar contrato
  async removeContrato(id: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: id },
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    return this.contratoRepo.remove(contrato);
  }

  async getResumenContrato(contratoId: string): Promise<ResumenContratoDTO> {
    // Buscar contrato
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: contratoId },
    });
    if (!contrato) throw new Error('Contrato no encontrado');

    // Invitaciones aceptadas/rechazadas desde contrato_integrante
    const invitaciones = await this.contratoIntegranteRepo.find({
      where: { id_contrato: contratoId },
      relations: {
        integrante: {
          user: true,
        },
      },
    });

    const aceptados: InvitacionDTO[] = invitaciones
      .filter((i) => i.estado === 'aceptado')
      .map((i) => ({
        nombre: i.integrante.user.persona?.nombre,
        especialidad: i.especialidad,
        estado: 'aceptado',
      }));

    const rechazados: InvitacionDTO[] = invitaciones
      .filter((i) => i.estado === 'rechazado')
      .map((i) => ({
        nombre: i.integrante.user.persona?.nombre,
        especialidad: i.especialidad,
        estado: 'rechazado',
      }));

    // Pendientes desde notificaciones (solo especialidad primaria y filtrado por tipo_servicio)
    const notificacionesPendientes = await this.notificacioneRepo.find({
      where: { contrato: { id_contrato: contratoId }, estado: 'pendiente' },
      relations: {
        user: true,
      },
    });

    const pendientes: InvitacionDTO[] = [];
    for (const n of notificacionesPendientes) {
      const integrante = await this.integranteRepo.findOne({
        where: { user: { id: n.user.id } },
        relations: {
          especialidadesAsignadas: {
            especialidad: true,
          },
          user: true,
        },
      });

      if (integrante) {
        // Tomar solo la especialidad primaria
        const especialidadPrimaria = integrante.especialidadesAsignadas.find(
          (e) => e.tipo === 'primario',
        );

        // Validar que la especialidad primaria esté dentro de las requeridas para el tipo_servicio
        const esRequerida = await this.tipoServicioEspecialidadRepo.findOne({
          where: {
            tipo_servicio: contrato.tipo_servicio,
            especialidad: { id: especialidadPrimaria?.especialidad.id },
            requerido: true,
          },
        });

        if (especialidadPrimaria && esRequerida) {
          pendientes.push({
            nombre: integrante.user.persona?.nombre,
            especialidad: especialidadPrimaria.especialidad.nombre,
            estado: 'pendiente',
          });
        } else {
          // Si no tiene primaria o no es requerida, fallback a N/A
          pendientes.push({
            nombre: integrante.user.persona?.nombre,
            especialidad: 'N/A',
            estado: 'pendiente',
          });
        }
      }
    }

    // Faltantes desde servicio_especialidad
    const requeridas = await this.tipoServicioEspecialidadRepo.find({
      where: { tipo_servicio: contrato.tipo_servicio, requerido: true },
      relations: {
        especialidad: true,
      },
    });

    const faltantes = requeridas.filter((req) => {
      const aceptado = aceptados.some(
        (a) => a.especialidad === req.especialidad.nombre,
      );
      const rechazado = rechazados.some(
        (r) => r.especialidad === req.especialidad.nombre,
      );
      return !aceptado && rechazado; // solo faltante si nadie aceptó y alguien rechazó
    });

    // Sugerencias desde members_replacements
    const sugerencias: SugerenciaDTO[] = [];
    for (const f of faltantes) {
      const candidatos = await this.reemplazoRepo.find({
        relations: {
          user: true,
          especialidadesAsignadas: {
            especialidad: true,
          },
        },
      });

      const filtrados = candidatos
        .filter((c) =>
          c.especialidadesAsignadas.some(
            (e) => e.especialidad.id === f.especialidad.id,
          ),
        )
        .map((c) => {
          const esp = c.especialidadesAsignadas.find(
            (e) => e.especialidad.id === f.especialidad.id,
          );

          const tipo = esp?.tipo === 'primario' ? 'primario' : 'secundario';

          return {
            id: c.id,
            nombre: c.user.persona?.nombre,
            tipo: tipo as 'primario' | 'secundario',
          };
        })
        .sort((a, b) => (a.tipo === 'primario' ? -1 : 1));

      sugerencias.push({
        especialidad: f.especialidad.nombre,
        candidatos: filtrados,
      });
    }

    return {
      contratoId,
      aceptados,
      rechazados,
      pendientes,
      faltantes: faltantes.map((f) => f.especialidad.nombre),
      sugerencias,
    };
  }

  async calcularMontos(contratoId: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: contratoId },
      relations: {
        ubicacion: true,
        evento: true,
      },
    });

    if (!contrato) {
      throw new NotFoundException('Contrato no encontrado');
    }

    if (!contrato.ubicacion) {
      throw new NotFoundException('El contrato no tiene ubicación asignada');
    }

    if (
      contrato.ubicacion.latitud == null ||
      contrato.ubicacion.longitud == null
    ) {
      throw new BadRequestException(
        'La ubicación del contrato no tiene coordenadas',
      );
    }

    const base = await this.datosempresa.obtenerUbicacionBase();

    const origen = { lat: base.lat, lng: base.lng };
    const destino = {
      lat: contrato.ubicacion.latitud,
      lng: contrato.ubicacion.longitud,
    };

    const { tiempo_segundos, distancia_metros } =
      await this.distanciaservicio.calcularTiempoYDistancia(origen, destino);

    const minutos = Math.ceil(tiempo_segundos / 60);

    // 🔑 Nuevo cálculo: bloques de 30 minutos
    const bloques30 = Math.ceil(minutos / 30);
    const recargo = bloques30 * 150;

    const monto_total = contrato.evento.precio_base + recargo;

    return {
      distancia_metros,
      tiempo_segundos,
      minutos,
      bloques30,
      recargo,
      precio_base: contrato.evento.precio_base,
      monto_total,
    };
  }

  async misReservas(userId: string) {
    const cliente = await this.clienteRepo
      .createQueryBuilder('cliente')
      .leftJoinAndSelect('cliente.persona', 'persona')
      .leftJoinAndSelect('cliente.user', 'user')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!cliente) {
      return [];
    }

    const empresa = await this.datosEmpresa.findOne({
      where: {},
    });

    const contratos = await this.contratoRepo
      .createQueryBuilder('contrato')
      .leftJoinAndSelect('contrato.cliente', 'cliente')
      .leftJoinAndSelect('contrato.evento', 'evento')
      .leftJoinAndSelect('contrato.ubicacion', 'ubicacion')
      .leftJoinAndSelect('cliente.persona', 'persona')
      .leftJoinAndSelect('contrato.pagos', 'pagos')
      .where('cliente.id = :clienteId', {
        clienteId: cliente.id,
      })
      .orderBy(
        `
    CASE
      WHEN contrato.estado = 'finalizado' THEN 1
      ELSE 0
    END
  `,
        'ASC',
      )
      .addOrderBy('contrato.creado_en', 'DESC')
      .getMany();

    const contratosConEstado = contratos.map((c) => ({
      ...c,
      tienePagoPendiente: c.pagos.some((p) => p.estado === 'pendiente'),
    }));

    return {
      contrato: contratosConEstado,
      empresa,
    };
  }

  async calcularPreview(destino: { lat: number; lng: number }) {
    const base = await this.datosempresa.obtenerUbicacionBase();
    const origen = { lat: base.lat, lng: base.lng };

    const { tiempo_segundos, distancia_metros } =
      await this.distanciaservicio.calcularTiempoYDistancia(origen, destino);

    let minutos = Math.ceil(tiempo_segundos / 60);

    // 🔹 Definir rectángulo de la zona problemática
    const latMin = -17.38; // esquina inferior izquierda (sur)
    const lngMin = -64.97; // esquina inferior izquierda (oeste)
    const latMax = -17.11; // esquina superior derecha (norte)
    const lngMax = -64.27; // esquina superior derecha (este)

    // 🔹 Detectar si destino está dentro del rectángulo
    const estaEnZonaProblematica =
      destino.lat >= latMin &&
      destino.lat <= latMax &&
      destino.lng >= lngMin &&
      destino.lng <= lngMax;

    // 🔹 Ajuste de tiempo si está en la zona problemática
    if (estaEnZonaProblematica) {
      minutos = Math.max(0, minutos - 10); // evitar negativos
    }

    // 🔹 Cálculo original
    const bloques30 = Math.floor(minutos / 30);
    const recargo = bloques30 * 150;

    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    return {
      distancia_metros,
      tiempo_segundos,
      minutos,
      horas,
      minutosRestantes,
      bloques30,
      recargo,
      ajuste_aplicado: estaEnZonaProblematica, // útil para debug
    };
  }

  // confirmacion de cliente de he leido los terminos y condiciones

  async respuestaClienteContrato(dto: ConfirmContratoDto) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: dto.id_contrato },
      relations: {
        cliente: {
          persona: true,
        },
        evento: true,
        ubicacion: true,
      },
    });


    if (!contrato) {
      throw new Error('Contrato no encontrado');
    }

    contrato.cliente_acepto_contrato = dto.acepta;

    contrato.cliente_fecha_aceptacion = new Date();

    contrato.cliente_motivo_cancelacion = dto.motivo ?? '';

    if (dto.acepta) {
      contrato.cliente_contrato_estado = 'CONTRATO_ACEPTADO_CLIENTE';
    } else {
      contrato.cliente_contrato_estado = 'CONTRATO_RECHAZADO_CLIENTE';
    }

    // buscar usuario
    const user = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('role.nombre = :nombre', { nombre: 'admin' })
      .getMany();

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }


    const fechaEvento = new Intl.DateTimeFormat('es-BO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(contrato.fecha_evento));

    const mensaje = `El cliente ${contrato.cliente.persona.nombre} ${contrato.cliente.persona.apellido} acepto las condiciones del contrato ${contrato.evento.nombre} programado para la fecha ${fechaEvento}.`;
    for (const admin of user) {
      const dto = await this.notificacionesService.generarNotificacion(
        TipoNotificacion.ADMIN,
        contrato,
        admin,
        mensaje,
        undefined,
        undefined,
        'CLIENTE_ACEPTO',
      );
      await this.notificacionesService.enviar(dto);
    }
    return this.contratoRepo.save(contrato);
  }

  async guardarPdfContrato(id: string, url: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: id },
    });

    if (!contrato) {
      throw new Error('Contrato no encontrado');
    }

    contrato.pdf_url = url;

    return this.contratoRepo.save(contrato);
  }
}
