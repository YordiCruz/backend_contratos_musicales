import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { EventosModule } from './eventos/eventos.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [CategoriasModule, EventosModule, MediaModule]
})
export class EventosModule {}
