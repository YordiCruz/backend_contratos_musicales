import { Module } from '@nestjs/common';
import { DisponibilidadEventosService } from './disponibilidad-eventos.service';
import { DisponibilidadEventosController } from './disponibilidad-eventos.controller';

@Module({
  controllers: [DisponibilidadEventosController],
  providers: [DisponibilidadEventosService],
})
export class DisponibilidadEventosModule {}
