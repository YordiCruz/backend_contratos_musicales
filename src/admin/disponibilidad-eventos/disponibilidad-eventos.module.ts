import { Module } from '@nestjs/common';
import { DisponibilidadEventosService } from './disponibilidad-eventos.service';
import { DisponibilidadEventosController } from './disponibilidad-eventos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisponibilidadEvento } from './entities/disponibilidad-evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DisponibilidadEvento])],
  controllers: [DisponibilidadEventosController],
  providers: [DisponibilidadEventosService],
})
export class DisponibilidadEventosModule {}
