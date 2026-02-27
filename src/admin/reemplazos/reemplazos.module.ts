import { Module } from '@nestjs/common';
import { ReemplazosService } from './reemplazos.service';
import { ReemplazosController } from './reemplazos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reemplazo } from './entities/reemplazo.entity';
import { Especialidad } from '../especialidades/especialidads/entities/especialidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reemplazo, Especialidad])],
  providers: [ReemplazosService],
  exports: [ReemplazosService],
})
export class ReemplazosModule {}
