import { Module } from '@nestjs/common';
import { SolicitarRecuperacionService } from './solicitar-recuperacion.service';
import { SolicitarRecuperacionController } from './solicitar-recuperacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitarRecuperacion } from './entities/solicitar-recuperacion.entity';
import { User } from '../../admin/users/entities/user.entity';
import { NotificacionesModule } from '../../admin/notificaciones/notificaciones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitarRecuperacion, User]),
    NotificacionesModule,
  ],
  controllers: [],
  providers: [SolicitarRecuperacionService],
  exports: [SolicitarRecuperacionService]
})
export class SolicitarRecuperacionModule {}
