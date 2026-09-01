import { Module } from '@nestjs/common';
import { IntegrantesService } from './integrantes.service';
import { IntegrantesController } from './integrantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Integrante } from './entities/integrante.entity';
import { Especialidad } from '../especialidades/especialidads/entities/especialidad.entity';
import { AdminAuthModule } from '../../auth/admin-auth/admin-auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Integrante, Especialidad]),
    AdminAuthModule
  ],
  providers: [IntegrantesService],
  //controllers: [IntegrantesController],
  exports:[IntegrantesService]
})
export class IntegrantesModule {}
