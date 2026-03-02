import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { MediaModule } from './media/media.module';
import { EventsModule } from './eventos/events.module';

@Module({
  imports: [CategoriasModule, MediaModule, EventsModule]
})
export class EventosModule{}
