import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
import { NotificacionesGateway } from './gateway/notificaciones.gateway';
import { User } from '../users/entities/user.entity';
import { Pago } from '../pagos/entities/pago.entity';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacione)
    private readonly notificacioneRepo: Repository<Notificacione>,


    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(IntegranteEspecialidad)
    private readonly integranteEspecialidadRepo: Repository<IntegranteEspecialidad>,

    @InjectRepository(TipoServicioEspecialidad)
    private readonly tipoServicioEspecialidadRepo: Repository<TipoServicioEspecialidad>,

    @InjectRepository(Contrato)
    private readonly contratoRepo: Repository<Contrato>,

    @InjectRepository(Reemplazo)
    private readonly reemplazoRepo: Repository<Reemplazo>,

    @InjectRepository(Pago)
    private readonly pagoRepo: Repository<Pago>,

    private readonly contratoService: ContratosService,
    private readonly gateway: NotificacionesGateway,



  ) {}


  async marcarComoLeida(id: string) {

  const notif = await this.notificacioneRepo.findOneBy({ id });

  if (!notif) {
    throw new NotFoundException();
  }

  notif.leido = true;

  return this.notificacioneRepo.save(notif);
}
  

async generarNotificacion(
  tipo: TipoNotificacion,
  contrato: Contrato,
  user: User,
  mensaje?: string,
  resumen?: ResumenContratoDTO,
  pago?: Pago,
  accion?: CreateNotificacioneDto['accion'],

): Promise<CreateNotificacioneDto> {

  switch (tipo) {

    

    case TipoNotificacion.INTEGRANTE:
    case TipoNotificacion.REEMPLAZO:
      const fechaFormatead = new Date(
  contrato.fecha_evento
).toLocaleDateString('es-BO', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
      return {
        tipo,
        destinatarioId: user.id,
        contratoId: contrato.id_contrato,
        mensaje: mensaje ??
          `Evento el ${fechaFormatead} (${contrato.bloque}), en ${contrato.ubicacion.nombre}. Horas: ${contrato.horas_contratadas}`,
        fecha: new Date(),
        accion: 'INTEGRANTE'
      };

    case TipoNotificacion.CLIENTE:
      const fechaFormatea = new Date(
  contrato.fecha_evento
).toLocaleDateString('es-BO', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
      return {
        tipo,
        destinatarioId: user.id,
        contratoId: contrato.id_contrato,
        mensaje: mensaje ??
          `Su contrato para el ${fechaFormatea} (${contrato.bloque}), en ${contrato.ubicacion.nombre}, está ${contrato.estado}`,
        fecha: new Date(),
        accion: accion ?? 'CLIENTE' 
      };

    case TipoNotificacion.ADMIN:
       const fechaFormateada = new Date(
  contrato.fecha_evento
).toLocaleDateString('es-BO', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

      return {
        tipo,
        destinatarioId: user.id,
        contratoId: contrato.id_contrato,
        mensaje: mensaje ??
          `Nuevo contrato: ${contrato.evento.nombre} (${fechaFormateada}) Servicio: ${contrato.tipo_servicio} Turno: ${contrato.bloque} A hrs: ${contrato.hora_inicio} Horas requeridas: ${contrato.horas_contratadas} ¿Desea confirmar y solicitar adelanto?`,
        fecha: new Date(),
        pagoId: pago?.id_pago,
        accion: accion ?? 'CONTRATO'
      };

    case TipoNotificacion.ADMIN_RESUMEN:
        const fechaFormat= new Date(
  contrato.fecha_evento
).toLocaleDateString('es-BO', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
      
      return {
        tipo,
        destinatarioId: user.id,
        contratoId: contrato.id_contrato,
        mensaje: JSON.stringify({
          evento: contrato.evento.nombre,
          fecha_evento: fechaFormat,
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
        accion: 'ADMIN_RESUMEN'
      };
  }
}





async enviar(
  dto: CreateNotificacioneDto,
): Promise<{ status: string; notificacion: Notificacione }> {

  const user = await this.userRepo.findOne({
    where: {
      id: dto.destinatarioId,
    },
  });

  const contrato = await this.contratoRepo.findOne({
    where: {
      id_contrato: dto.contratoId,
    },
  });

  if (!user || !contrato) {
    throw new Error('Usuario o contrato no encontrados');
  }

  let pago: Pago | undefined;

if (dto.pagoId) {
  pago = await this.pagoRepo.findOne({
    where: {
      id_pago: dto.pagoId,
    },
  }) ?? undefined;
}

  const notificacion = this.notificacioneRepo.create({
    tipo: dto.tipo,
    user,
    contrato,
    pago,
    mensaje: dto.mensaje,
    fecha: dto.fecha,
    estado: 'pendiente',
    leido: false,
    accion: dto.accion
  });

  await this.notificacioneRepo.save(notificacion);

  // 🔥 SOCKET REALTIME
  this.gateway.sendToUser(
    user.id,
    {
      id: notificacion.id,
      tipo: notificacion.tipo,
      mensaje: notificacion.mensaje,
      fecha: notificacion.fecha,
      leido: notificacion.leido,
      estado: notificacion.estado,

      accion: notificacion.accion,   
    pago: notificacion.pago,       
    contrato: notificacion.contrato 
    }
  );

  console.log('🔔 enviada a user:', user.id);

  return {
    status: 'ok',
    notificacion,
  };
}


//para recuperar contraséña

async generarNotificacionSistema(
  tipo: TipoNotificacion,
  user: User,
  mensaje: string,
  accion?: CreateNotificacioneDto['accion'],
  usuarioOrigenId?:string
): Promise<CreateNotificacioneDto> {


  return {

    tipo,

    destinatarioId: user.id,

    mensaje,

    fecha: new Date(),

    accion: accion ?? 'RECUPERAR_PASSWORD',

    contratoId: '',

    pagoId: '',

    usuarioOrigenId

  };

}
async enviarNotificacionSistema(
  dto: CreateNotificacioneDto,
): Promise<{status:string, notificacion:Notificacione}> {


  const user = await this.userRepo.findOne({
    where:{
      id:dto.destinatarioId
    }
  });


  if(!user){

    throw new BadRequestException(
      'Usuario no encontrado'
    );

  }


  const user2 = await this.userRepo.findOne({
    where:{
      id:dto.usuarioOrigenId
    }
  });

  console.log('este es el user2', user2);
  
  if(!user2){

    throw new BadRequestException(
      'Usuario no encontrado'
    );

  }

  user2.solicitud_recuperacion = true
  
  await this.userRepo.save(
    user2
  );


  const notificacion =
  this.notificacioneRepo.create({

    tipo:dto.tipo,

    user,

    contrato:null,

    pago:null,

    mensaje:dto.mensaje,

    fecha:dto.fecha,

    estado:'pendiente',

    leido:false,

    accion:dto.accion,

    usuarioOrigenId: user2.id

  });



  await this.notificacioneRepo.save(
    notificacion
  );



  // SOCKET

  this.gateway.sendToUser(
    user.id,
    {

      id:notificacion.id,

      tipo:notificacion.tipo,

      mensaje:notificacion.mensaje,

      fecha:notificacion.fecha,

      leido:notificacion.leido,

      estado:notificacion.estado,

      accion:notificacion.accion,

      pago:null,

      contrato:null

    }
  );



  console.log(
    '🔔 enviada notificación sistema a user:',
    user.id
  );



  return {

    status:'ok',

    notificacion

  };


}

///



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
      relations:{
        integrante:{
          user: true
        }
    },
    });

    const integrantes = relaciones.map((r) => r.integrante);

    // 3. Generar y enviar notificaciones para todos
    const results: { status: string; notificacion: Notificacione }[] = [];

    for (const integrante of integrantes) {
      //console.log('Enviando notificación a:', integrante.persona?.id, integrante.persona?.nombre);

      const dto = await this.generarNotificacion(
        TipoNotificacion.INTEGRANTE,
        contrato,
        integrante.user,
      );
      const notif = await this.enviar(dto);
      results.push(notif);
    }

    // console.log('Total notificaciones enviadas:', results.length);

    return { status: 'ok', total: results.length, notificaciones: results };
  }


async notificaReemplazos(contratoId: string) {
  console.log('🔔 Iniciando notificarReemplazos para contrato:', contratoId);

  const contrato = await this.contratoRepo.findOne({
    where: { id_contrato: contratoId },
  });

  if (!contrato) throw new Error('Contrato no encontrado');

  const resumen = await this.contratoService.getResumenContrato(contratoId);

  type NotifResult = { status: string; notificacion: Notificacione };

  const results: NotifResult[] = [];

  for (const s of resumen.sugerencias) {
    for (const candidato of s.candidatos) {

      const replacement = await this.reemplazoRepo.findOne({
        where: { id: candidato.id },
        relations: {
          user: true,
        },
      });

      if (!replacement?.user) continue;

      const user = replacement.user;

      // 🔥 1. Verificar si YA existe una notificación pendiente
      const existente = await this.notificacioneRepo.findOne({
        where: {
          user: { id: user.id }, // 🔥 antes persona
          contrato: { id_contrato: contratoId },
          tipo: TipoNotificacion.REEMPLAZO,
          estado: 'pendiente',
        },
      });

      if (existente) {
        console.log(
          `⚠️ Ya existe notificación pendiente para ${user.email}, no se crea otra.`,
        );
        continue;
      }

      // 🔥 2. Crear nueva notificación
      const dto = await this.generarNotificacion(
        TipoNotificacion.REEMPLAZO,
        contrato,
        user,
      );

      const notif = await this.enviar(dto);

      console.log('💾 Notificación creada:', notif.notificacion.id);

      results.push(notif);
    }
  }

  return {
    status: 'ok',
    total: results.length,
    notificaciones: results,
  };
}

 
async notificarReemplazoIndividual(contratoId: string, reemplazoId: string) {
  const contrato = await this.contratoRepo.findOne({
    where: { id_contrato: contratoId },
    relations: {
      ubicacion: true,
       evento:true
      },
  });

  if (!contrato) throw new Error('Contrato no encontrado');

  const replacement = await this.reemplazoRepo.findOne({
    where: { id: reemplazoId },
    relations: {
      user: true
    },
  });

  if (!replacement || !replacement.user) {
    throw new Error('Reemplazo o usuario no encontrado');
  }

  const usuario = replacement.user;

  // 🔥 1. Verificar si ya existe notificación pendiente
  const existente = await this.notificacioneRepo.findOne({
    where: {
      user: { id: usuario.id },
      contrato: { id_contrato: contratoId },
      tipo: TipoNotificacion.REEMPLAZO,
      estado: 'pendiente',
    },
  });

  if (existente) {
    return {
      status: 'skip',
      mensaje: `Ya existe una notificación pendiente para ${usuario.persona?.nombre}`,
      notificacion: existente,
    };
  }

  // 🔥 2. Crear nueva notificación
  const dto = await this.generarNotificacion(
    TipoNotificacion.REEMPLAZO,
    contrato,
    usuario,
  );

  const notif = await this.enviar(dto);

  return {
    status: 'ok',
    mensaje: `Notificación enviada a ${usuario.persona?.nombre}`,
    notificacion: notif.notificacion,
  };
}


async notificarAdelanto(contratoId: string) {
  const contrato = await this.contratoRepo.findOne({
    where: { id_contrato: contratoId },
    relations:  { 
      cliente: {
        user: true 
      }, 
      ubicacion: true
    },
  });

  if (!contrato) throw new NotFoundException('Contrato no encontrado');

  // 1. Verificar si ya existe notificación pendiente
  const existente = await this.notificacioneRepo.findOne({
    where: {
      contrato: { id_contrato: contratoId },
      user: { id: contrato.cliente.persona.id },
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
    contrato.cliente.user,
    `Estimado cliente, para continuar con su contrato del ${contrato.fecha_evento} (${contrato.bloque}) en ${contrato.ubicacion.nombre}, es necesario realizar el pago de adelanto.`
  );

  return this.enviar(dto);
}

  findAll() {
    return this.notificacioneRepo.find();
  }


  async obtenerMisNotificaciones(userId: string) {
  return this.notificacioneRepo.find({
    where: {
      user: { id: userId },
    },
    order: {
      fecha: 'DESC',
    },
    relations: {
      contrato: true,
    },
  });
}

}
