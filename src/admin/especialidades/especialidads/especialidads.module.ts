import { Module } from '@nestjs/common';
import { EspecialidadsService } from './especialidads.service';
import { EspecialidadsController } from './especialidads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidad } from './entities/especialidad.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([Especialidad])],
  controllers: [EspecialidadsController],
  providers: [EspecialidadsService],
})
export class EspecialidadsModule {}
