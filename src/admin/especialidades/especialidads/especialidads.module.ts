import { Module } from '@nestjs/common';
import { EspecialidadsService } from './especialidads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidad } from './entities/especialidad.entity';
import { CategoriasEspecialidad } from '../categorias_especialidads/entities/categorias_especialidad.entity';
import { EspecialidadsController } from './especialidads.controller';

@Module({
  imports:[ TypeOrmModule.forFeature([Especialidad, CategoriasEspecialidad])],
  providers: [EspecialidadsService],
  //controllers: [EspecialidadsController],
  exports:[EspecialidadsService],
})
export class EspecialidadsModule {}
