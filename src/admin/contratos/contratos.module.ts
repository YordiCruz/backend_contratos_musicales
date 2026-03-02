import { Module } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { ContratosController } from './contratos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contrato } from './entities/contrato.entity';
import { DisponibilidadEvento } from '../disponibilidad-eventos/entities/disponibilidad-evento.entity';
import { ContratoIntegrante } from './entities/contrato-integrante.entity';
import { ContratoReemplazo } from './entities/contrato-reemplazo.entity';
import { Ubicacion } from './entities/ubicacion.entity';
import { UbicacionService } from './ubicacion.service';
import { UbicacionController } from './ubicacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contrato, DisponibilidadEvento, ContratoIntegrante, ContratoReemplazo, Ubicacion])],
  controllers: [ContratosController, UbicacionController],
  providers: [ContratosService, UbicacionService, UbicacionController],
})
export class ContratosModule {}
