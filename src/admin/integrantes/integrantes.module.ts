import { Module } from '@nestjs/common';
import { IntegrantesService } from './integrantes.service';
import { IntegrantesController } from './integrantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Integrante } from './entities/integrante.entity';
import { Especialidad } from '../especialidades/especialidads/entities/especialidad.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Integrante, Especialidad])],
  controllers: [IntegrantesController],
  providers: [IntegrantesService],
})
export class IntegrantesModule {}
