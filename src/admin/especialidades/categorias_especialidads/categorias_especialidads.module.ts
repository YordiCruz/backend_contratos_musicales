import { Module } from '@nestjs/common';
import { CategoriasEspecialidadsService } from './categorias_especialidads.service';
import { CategoriasEspecialidadsController } from './categorias_especialidads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasEspecialidad } from './entities/categorias_especialidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriasEspecialidad])],
  providers: [CategoriasEspecialidadsService],
  exports: [CategoriasEspecialidadsService]
})
export class CategoriasEspecialidadsModule {}
