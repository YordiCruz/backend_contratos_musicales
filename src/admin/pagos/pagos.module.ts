import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Contrato } from '../contratos/entities/contrato.entity';
import { User } from '../users/entities/user.entity';
import { DatosEmpresa } from '../datos-empresa/entities/datos-empresa.entity';
import { DisponibilidadEvento } from '../disponibilidad-eventos/entities/disponibilidad-evento.entity';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pago, Contrato, User, DatosEmpresa, DisponibilidadEvento]),
    NotificacionesModule,
  ],
  providers: [PagosService],
  exports: [PagosService],
})
export class PagosModule {}
