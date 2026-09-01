import { Repository } from "typeorm";
import { EstadoPago, Pago } from "../../admin/pagos/entities/pago.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Contrato } from "../../admin/contratos/entities/contrato.entity";
import { User } from "../../admin/users/entities/user.entity";
import { NotificacionesService } from "../../admin/notificaciones/notificaciones.service";
import { TipoNotificacion } from "../../admin/notificaciones/dto/create-notificacione.dto";


export class PagoService {

    constructor(
        @InjectRepository(Pago)
        private readonly pagoRepo: Repository<Pago>,

        @InjectRepository(Contrato)
        private readonly contratoRepo: Repository<Contrato>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        private notificacionesService: NotificacionesService

        
    ) {
        
    }
    
    async registrarPago(dto: any) {

  const contrato = await this.contratoRepo.findOne({
    where: {
      id_contrato: dto.contratoId,
    },
    relations: ['pagos'],
  });

  if (!contrato) {
    throw new NotFoundException('Contrato no encontrado');
  }

  if (Number(dto.monto) <= 0) {
    throw new BadRequestException(
      'El monto debe ser mayor a cero.',
    );
  }

  const montoPago = Number(dto.monto);

  // validar contra saldo actual del contrato
  if (montoPago > Number(contrato.saldo)) {
    throw new BadRequestException(
      'El monto excede el saldo pendiente del contrato.',
    );
  }

  const pago = this.pagoRepo.create({
    contrato,
    monto: montoPago,
    metodo: dto.metodo,
    tipo: dto.tipo,
    referencia: dto.referencia,
    proveedor: dto.proveedor ?? null,
    registrado_por: dto.registrado_por,

    fecha_solicitud: new Date(),
    fecha_pago: null,
    estado: EstadoPago.PENDIENTE,
  });

  await this.pagoRepo.save(pago);

// 🔔 BUSCAR ADMIN
const adminUsers = await this.userRepo
  .createQueryBuilder('user')
  .leftJoin('user.roles', 'role')
  .where('role.nombre = :nombre', { nombre: 'admin' })
  .getMany();

// 🔔 generar mensaje
const mensaje = `Nuevo pago de Bs. ${montoPago.toFixed(2)} registrado para el contrato del evento "${contrato.evento.nombre}" con fecha ${contrato.fecha_evento}.`;

// 🔔 crear notificación por cada admin
for (const admin of adminUsers) {

  const dto = await this.notificacionesService.generarNotificacion(
    TipoNotificacion.ADMIN,
    contrato,
    admin,
    mensaje,
    undefined,
    pago,
    'PAGO'
  );

  await this.notificacionesService.enviar(dto);
}

return {
  mensaje: 'Pago registrado correctamente. Pendiente de validación.',
  pago,
};
}

 

 async listarPagos(contratoId: string) {
    try {
      return await this.pagoRepo.find({
        relations:{
          contrato: {
            cliente: {
              persona: true,
            },
            evento: true,
            ubicacion: true,
          },
        },
        where: { contrato: { id_contrato: contratoId } },
      });
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Error al listar pagos: ${error.message}`,
      );
    }
  }
}