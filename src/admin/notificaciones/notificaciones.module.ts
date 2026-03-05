import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { EmailModule } from '../email/email.module';
import { ContratosModule } from '../contratos/contratos.module';

@Module({
  controllers: [NotificacionesController],
  providers: [NotificacionesService, EmailModule, ContratosModule],
})
export class NotificacionesModule {}
