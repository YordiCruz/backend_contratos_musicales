import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { EmailModule } from '../email/email.module';

@Module({
  controllers: [NotificacionesController],
  providers: [NotificacionesService, EmailModule],
})
export class NotificacionesModule {}
