import { Injectable } from '@nestjs/common';
import { CreateNotificacioneDto, TipoNotificacion } from './dto/create-notificacione.dto';
import { UpdateNotificacioneDto } from './dto/update-notificacione.dto';
import { In, Repository } from 'typeorm';
import { Notificacione } from './entities/notificacione.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from '../personas/entities/persona.entity';
import { EmailService } from '../email/email.service';
import { Contrato } from '../contratos/entities/contrato.entity';

@Injectable()
export class NotificacionesService {

  constructor(
    @InjectRepository(Notificacione)
    private readonly notificacioneRepo: Repository<Notificacione>,

    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,

    private readonly emailService: EmailService,

    @InjectRepository(Contrato)
    private readonly contratoRepo: Repository<Contrato>,

  ) {}


  async generarNotificacion(tipo: TipoNotificacion, contrato: Contrato, persona: Persona) {
  switch (tipo) {
    case TipoNotificacion.INTEGRANTE:
    case TipoNotificacion.REEMPLAZO:
      return {
        tipo,
        destinatarioId: persona.id,
        contratoId: contrato.id_contrato,
        mensaje: `Evento el ${contrato.fecha_evento} (${contrato.bloque}), en ${contrato.ubicacion.nombre}. Horas: ${contrato.horas_contratadas}`,
        fecha: new Date(),
      };
    case TipoNotificacion.CLIENTE:
      return {
        tipo,
        destinatarioId: persona.id,
        contratoId: contrato.id_contrato,
        mensaje: `Su contrato para el ${contrato.fecha_evento} (${contrato.bloque}), en ${contrato.ubicacion.nombre}, está ${contrato.estado}`,
        fecha: new Date(),
      };
    case TipoNotificacion.ADMIN:
      return {
        tipo,
        destinatarioId: persona.id,
        contratoId: contrato.id_contrato,
        mensaje: `Contrato ${contrato.id_contrato}: Integrantes/Reemplazos aceptados y pendientes. Estado: ${contrato.estado}`,
        fecha: new Date(),
      };
  }
}


async enviar(dto: CreateNotificacioneDto) {
  // Persistimos la notificación en la BD
  const notificacion = this.notificacioneRepo.create({
    tipo: dto.tipo,
    personaId: dto.destinatarioId,
    contratoId: dto.contratoId,
    mensaje: dto.mensaje,
    fecha: dto.fecha,
  });
  await this.notificacioneRepo.save(notificacion);

  // Envío por canal (ejemplo: email con Mailtrap)
  if (
    dto.tipo === TipoNotificacion.INTEGRANTE ||
    dto.tipo === TipoNotificacion.REEMPLAZO ||
    dto.tipo === TipoNotificacion.CLIENTE
  ) {
    await this.emailService.send(
      'destinatario@ejemplo.com', // aquí va persona.email
      'Invitación a evento',
      `
        <h3>Evento el ${dto.fecha}</h3>
        <p>Contrato: ${dto.contratoId}</p>
        <a href="http://localhost:3000/contratos/${dto.contratoId}/invitaciones/${dto.destinatarioId}/aceptar"
           style="background:green;color:white;padding:10px;text-decoration:none;">
           Aceptar evento
        </a>
        <a href="http://localhost:3000/contratos/${dto.contratoId}/invitaciones/${dto.destinatarioId}/rechazar"
           style="background:red;color:white;padding:10px;text-decoration:none;">
           Rechazar evento
        </a>
      `
    );
  }

  // Para IN-APP simplemente queda registrado en la BD
  return { status: 'ok', notificacion };
}


  



  findAll() {
    return `This action returns all notificaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacione`;
  }

  update(id: number, updateNotificacioneDto: UpdateNotificacioneDto) {
    return `This action updates a #${id} notificacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificacione`;
  }
}
