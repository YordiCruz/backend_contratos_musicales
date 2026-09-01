import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSolicitarRecuperacionDto } from './dto/create-solicitar-recuperacion.dto';
import { UpdateSolicitarRecuperacionDto } from './dto/update-solicitar-recuperacion.dto';
import { User } from '../../admin/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitarRecuperacion } from './entities/solicitar-recuperacion.entity';
import { NotificacionesService } from '../../admin/notificaciones/notificaciones.service';
import { TipoNotificacion } from '../../admin/notificaciones/dto/create-notificacione.dto';

@Injectable()
export class SolicitarRecuperacionService {

  constructor(

@InjectRepository(User)
private usuarioRepository:Repository<User>,


@InjectRepository(SolicitarRecuperacion)
private solicitudRepository:
Repository<SolicitarRecuperacion>,


private notificacionesService:
NotificacionesService

){}


async solicitarRecuperacion(
  correo: string
) {


  const usuario =
    await this.usuarioRepository.findOne({

      where: {
        email: correo
      },

      relations: [
        'cliente',
        'cliente.persona'
      ]

    });

  


  if (!usuario) {

    throw new BadRequestException(
      'No existe una cuenta registrada con ese correo'
    );

  }




  // Evitar solicitudes duplicadas pendientes

  const solicitudExistente =
    await this.solicitudRepository.findOne({

      where: {

        correo,

        estado: 'pendiente'

      }

    });



  if (solicitudExistente) {

    return {

      message:
      'Ya existe una solicitud pendiente de recuperación'

    };

  }





  // Crear solicitud

  const solicitud =
    this.solicitudRepository.create({

      correo,

      estado:'pendiente'

    });



  await this.solicitudRepository.save(
    solicitud
  );





  const cliente =
    usuario.cliente;



  // Buscar administradores

  const admins =
    await this.usuarioRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where(
        'LOWER(role.nombre) = LOWER(:rol)',
        {
          rol:'ADMIN'
        }
      )
      .getMany();






  // Notificar administradores

  for (const admin of admins) {


    const notifDto =
await this.notificacionesService.generarNotificacionSistema(

  TipoNotificacion.ADMIN,

  admin,

  `
🔐 Solicitud de recuperación de contraseña

Cliente:
${cliente?.persona?.nombre ?? 'Cliente no encontrado'}

Correo:
${usuario.email}

El cliente solicita restablecer la contraseña.
  `,

  'RECUPERAR_PASSWORD',

  usuario.id


);


    await this.notificacionesService
      .enviarNotificacionSistema(notifDto);



  }




  return {


    message:
    'Solicitud enviada correctamente'


  };


}


  create(createSolicitarRecuperacionDto: CreateSolicitarRecuperacionDto) {
    return 'This action adds a new solicitarRecuperacion';
  }

  findAll() {
    return `This action returns all solicitarRecuperacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solicitarRecuperacion`;
  }

  update(id: number, updateSolicitarRecuperacionDto: UpdateSolicitarRecuperacionDto) {
    return `This action updates a #${id} solicitarRecuperacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} solicitarRecuperacion`;
  }
}
