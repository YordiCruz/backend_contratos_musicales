import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateNotificacioneDto,
  TipoNotificacion,
} from './dto/create-notificacione.dto';
import { In, Repository } from 'typeorm';
import { Notificacione } from './entities/notificacione.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from '../personas/entities/persona.entity';
import { EmailService } from '../email/email.service';
import { Contrato } from '../contratos/entities/contrato.entity';
import { ContratosService } from '../contratos/contratos.service';
import { TipoServicioEspecialidad } from '../contratos/entities/tipo-servicio-especialidad.entity';
import { Integrante } from '../integrantes/entities/integrante.entity';
import { IntegranteEspecialidad } from '../integrantes/entities/integrante-especialidad.entity';
import { ResumenContratoDTO, SugerenciaDTO } from '../contratos/dto/resumen-contrato.dto';
import { Reemplazo } from '../reemplazos/entities/reemplazo.entity';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacione)
    private readonly notificacioneRepo: Repository<Notificacione>,

    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,

    @InjectRepository(IntegranteEspecialidad)
    private readonly integranteEspecialidadRepo: Repository<IntegranteEspecialidad>,

    @InjectRepository(TipoServicioEspecialidad)
    private readonly tipoServicioEspecialidadRepo: Repository<TipoServicioEspecialidad>,

    @InjectRepository(Contrato)
    private readonly contratoRepo: Repository<Contrato>,

    @InjectRepository(Reemplazo)
    private readonly reemplazoRepo: Repository<Reemplazo>,

    private readonly contratoService: ContratosService,
  ) {}

async generarNotificacion(
  tipo: TipoNotificacion,
  contrato: Contrato,
  persona: Persona,
  mensaje?: string,
  resumen?: ResumenContratoDTO,
): Promise<CreateNotificacioneDto> {

  switch (tipo) {

    case TipoNotificacion.INTEGRANTE:
    case TipoNotificacion.REEMPLAZO:
      return {
        tipo,
        destinatarioId: persona.id,
        contratoId: contrato.id_contrato,
        mensaje: mensaje ??
          `Evento el ${contrato.fecha_evento} (${contrato.bloque}), en ${contrato.ubicacion.nombre}. Horas: ${contrato.horas_contratadas}`,
        fecha: new Date(),
      };

    case TipoNotificacion.CLIENTE:
      return {
        tipo,
        destinatarioId: persona.id,
        contratoId: contrato.id_contrato,
        mensaje: mensaje ??
          `Su contrato para el ${contrato.fecha_evento} (${contrato.bloque}), en ${contrato.ubicacion.nombre}, está ${contrato.estado}`,
        fecha: new Date(),
      };

    case TipoNotificacion.ADMIN:
      return {
        tipo,
        destinatarioId: persona.id,
        contratoId: contrato.id_contrato,
        mensaje: mensaje ??
          `Nuevo contrato: ${contrato.evento.nombre} - ${contrato.fecha_evento} (${contrato.bloque}) a hrs: ${contrato.hora_inicio}, horas contratadas: ${contrato.horas_contratadas}, Estado: ${contrato.estado}, ¿Desea informar a los integrantes?`,
        fecha: new Date(),
      };

    case TipoNotificacion.ADMIN_RESUMEN:
      return {
        tipo,
        destinatarioId: persona.id,
        contratoId: contrato.id_contrato,
        mensaje: JSON.stringify({
          evento: contrato.evento.nombre,
          fecha_evento: contrato.fecha_evento,
          bloque: contrato.bloque,
          ubicacion: contrato.ubicacion.nombre,
          aceptados: resumen?.aceptados,
          rechazados: resumen?.rechazados,
          pendientes: resumen?.pendientes,
          faltantes: resumen?.faltantes,
          sugerencias: resumen?.sugerencias.filter(
            (s) =>
              resumen.rechazados.some(
                (r) => r.especialidad === s.especialidad,
              ) || resumen.faltantes.includes(s.especialidad),
          ),
        }),
        fecha: new Date(),
      };
  }
}
  async enviar(
    dto: CreateNotificacioneDto,
  ): Promise<{ status: string; notificacion: Notificacione }> {
    const persona = await this.personaRepo.findOne({
      where: { id: dto.destinatarioId },
    });
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: dto.contratoId },
    });

    if (!persona || !contrato) {
      throw new Error('Persona o contrato no encontrados');
    }

    const notificacion = this.notificacioneRepo.create({
      tipo: dto.tipo,
      persona,
      contrato,
      mensaje: dto.mensaje,
      fecha: dto.fecha,
    });

    await this.notificacioneRepo.save(notificacion);

    // 👇 Quitamos el envío de email, solo guardamos en BD
    // if (
    //   dto.tipo === TipoNotificacion.INTEGRANTE ||
    //   dto.tipo === TipoNotificacion.REEMPLAZO ||
    //   dto.tipo === TipoNotificacion.CLIENTE
    // ) {
    //   await this.emailService.send(...);
    // }

    // Para IN-APP simplemente queda registrado en la BD
    return { status: 'ok', notificacion };
  }



  async notificarIntegrantesPorServicio(contrato: Contrato) {
    // 1. Buscar especialidades requeridas
    const especialidades = await this.tipoServicioEspecialidadRepo.find({
      where: { tipo_servicio: contrato.tipo_servicio, requerido: true },
    });
    const idsEspecialidades = especialidades.map((e) => e.especialidad.id);

    // 2. Buscar integrantes con esas especialidades
    const relaciones = await this.integranteEspecialidadRepo.find({
      where: {
        especialidad: { id: In(idsEspecialidades) },
        tipo: 'primario', // 👈 solo especialidad primaria
      },
      relations: ['integrante', 'integrante.persona'],
    });

    const integrantes = relaciones.map((r) => r.integrante);

    // 3. Generar y enviar notificaciones para todos
    const results: { status: string; notificacion: Notificacione }[] = [];

    for (const integrante of integrantes) {
      //console.log('Enviando notificación a:', integrante.persona?.id, integrante.persona?.nombre);

      const dto = await this.generarNotificacion(
        TipoNotificacion.INTEGRANTE,
        contrato,
        integrante.persona,
      );
      const notif = await this.enviar(dto);
      results.push(notif);
    }

    // console.log('Total notificaciones enviadas:', results.length);

    return { status: 'ok', total: results.length, notificaciones: results };
  }




  async notificaReemplazos(contratoId: string) {
  console.log('🔔 Iniciando notificarReemplazos para contrato:', contratoId);

  const contrato = await this.contratoRepo.findOne({ where: { id_contrato: contratoId } });
  if (!contrato) throw new Error('Contrato no encontrado');

  const resumen = await this.contratoService.getResumenContrato(contratoId);


  type NotifResult = { status: string; notificacion: Notificacione };

const results: NotifResult[] = [];

  for (const s of resumen.sugerencias) {
    for (const candidato of s.candidatos) {

      const replacement = await this.reemplazoRepo.findOne({
        where: { id: candidato.id },
        relations: ['persona'],
      });

      if (!replacement?.persona) continue;

      const persona = replacement.persona;

      // 🔥 1. Verificar si YA existe una notificación pendiente
      const existente = await this.notificacioneRepo.findOne({
        where: {
          persona: { id: persona.id },
          contrato: { id_contrato: contratoId },
          tipo: TipoNotificacion.REEMPLAZO,
          estado: 'pendiente',
        },
      });

      if (existente) {
        console.log(`⚠️ Ya existe notificación pendiente para ${persona.nombre}, no se crea otra.`);
        continue;
      }

      // 🔥 2. Crear nueva notificación
      const dto = await this.generarNotificacion(
        TipoNotificacion.REEMPLAZO,
        contrato,
        persona
      );

      const notif = await this.enviar(dto);
      console.log('💾 Notificación creada:', notif.notificacion.id);

      results.push(notif);
    }
  }

  return { status: 'ok', total: results.length, notificaciones: results };
}


async notificarReemplazoIndividual(contratoId: string, reemplazoId: string) {
  const contrato = await this.contratoRepo.findOne({
    where: { id_contrato: contratoId },
    relations: ['ubicacion', 'evento'],
  });

  if (!contrato) throw new Error('Contrato no encontrado');

  const replacement = await this.reemplazoRepo.findOne({
    where: { id: reemplazoId },
    relations: ['persona'],
  });

  if (!replacement || !replacement.persona) {
    throw new Error('Reemplazo o persona no encontrado');
  }

  const persona = replacement.persona;

  // 🔥 1. Verificar si ya existe notificación pendiente
  const existente = await this.notificacioneRepo.findOne({
    where: {
      persona: { id: persona.id },
      contrato: { id_contrato: contratoId },
      tipo: TipoNotificacion.REEMPLAZO,
      estado: 'pendiente',
    },
  });

  if (existente) {
    return {
      status: 'skip',
      mensaje: `Ya existe una notificación pendiente para ${persona.nombre}`,
      notificacion: existente,
    };
  }

  // 🔥 2. Crear nueva notificación
  const dto = await this.generarNotificacion(
    TipoNotificacion.REEMPLAZO,
    contrato,
    persona,
  );

  const notif = await this.enviar(dto);

  return {
    status: 'ok',
    mensaje: `Notificación enviada a ${persona.nombre}`,
    notificacion: notif.notificacion,
  };
}


async notificarAdelanto(contratoId: string) {
  const contrato = await this.contratoRepo.findOne({
    where: { id_contrato: contratoId },
    relations: ['cliente', 'cliente.persona', 'ubicacion'],
  });

  if (!contrato) throw new NotFoundException('Contrato no encontrado');

  // 1. Verificar si ya existe notificación pendiente
  const existente = await this.notificacioneRepo.findOne({
    where: {
      contrato: { id_contrato: contratoId },
      persona: { id: contrato.cliente.persona.id },
      tipo: TipoNotificacion.CLIENTE,
      estado: 'pendiente',
    },
  });

  if (existente) {
    return {
      status: 'skip',
      mensaje: 'Ya existe una notificación pendiente de adelanto para este cliente',
      notificacion: existente,
    };
  }

  // 2. Crear nueva notificación
  const dto = await this.generarNotificacion(
    TipoNotificacion.CLIENTE,
    contrato,
    contrato.cliente.persona,
    `Estimado cliente, para continuar con su contrato del ${contrato.fecha_evento} (${contrato.bloque}) en ${contrato.ubicacion.nombre}, es necesario realizar el pago de adelanto.`
  );

  return this.enviar(dto);
}

  findAll() {
    return this.notificacioneRepo.find();
  }
}
