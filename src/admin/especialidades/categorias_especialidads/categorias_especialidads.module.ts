import { Module } from '@nestjs/common';
import { CategoriasEspecialidadsService } from './categorias_especialidads.service';
import { CategoriasEspecialidadsController } from './categorias_especialidads.controller';

@Module({
  controllers: [CategoriasEspecialidadsController],
  providers: [CategoriasEspecialidadsService],
})
export class CategoriasEspecialidadsModule {}
