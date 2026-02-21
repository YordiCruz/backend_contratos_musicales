import { Module } from '@nestjs/common';
import { IntegrantesService } from './integrantes.service';
import { IntegrantesController } from './integrantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Integrante } from './entities/integrante.entity';
import { Persona } from '../personas/entities/persona.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Integrante])],
  controllers: [IntegrantesController],
  providers: [IntegrantesService],
})
export class IntegrantesModule {}
