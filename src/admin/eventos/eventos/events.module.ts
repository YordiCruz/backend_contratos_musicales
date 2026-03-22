import { Module } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { Media } from '../media/entities/media.entity';
import { Categoria } from '../categorias/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Media, Categoria])],
  //controllers: [EventosController],
  providers: [EventosService],
  exports: [EventosService],
})
export class EventsModule {}
