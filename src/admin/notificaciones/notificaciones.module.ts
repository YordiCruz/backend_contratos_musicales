import { forwardRef, Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { ContratosModule } from '../contratos/contratos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacione } from './entities/notificacione.entity';
import { Contrato } from '../contratos/entities/contrato.entity';
import { IntegranteEspecialidad } from '../integrantes/entities/integrante-especialidad.entity';
import { Integrante } from '../integrantes/entities/integrante.entity';
import { TipoServicioEspecialidad } from '../contratos/entities/tipo-servicio-especialidad.entity';
import { Reemplazo } from '../reemplazos/entities/reemplazo.entity';
import { NotificacionesGateway } from './gateway/notificaciones.gateway';
import { User } from '../users/entities/user.entity';
import { Pago } from '../pagos/entities/pago.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notificacione,
      Contrato,
      User,
      IntegranteEspecialidad,
      Integrante,
      TipoServicioEspecialidad,
      Reemplazo,
      Pago,
    ]),
    forwardRef(() => ContratosModule),
  ],
  controllers: [],
  providers: [NotificacionesService, NotificacionesGateway],
  exports: [NotificacionesService],
})
export class NotificacionesModule {}
