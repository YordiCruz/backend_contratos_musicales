import { forwardRef, Module } from '@nestjs/common';
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
import { Notificacione } from '../notificaciones/entities/notificacione.entity';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';
import { PersonasModule } from '../personas/personas.module';
import { Persona } from '../personas/entities/persona.entity';
import { User } from '../users/entities/user.entity';
import { TipoServicioEspecialidad } from './entities/tipo-servicio-especialidad.entity';
import { Integrante } from '../integrantes/entities/integrante.entity';
import { IntegranteEspecialidad } from '../integrantes/entities/integrante-especialidad.entity';
import { Reemplazo } from '../reemplazos/entities/reemplazo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contrato, DisponibilidadEvento, ContratoIntegrante, ContratoReemplazo, Ubicacion, Notificacione, Persona, User, TipoServicioEspecialidad, Integrante, Reemplazo]),
  forwardRef(() => (NotificacionesModule)),
  
],
  controllers: [ContratosController, UbicacionController],
  providers: [ContratosService, UbicacionService, UbicacionController],
  exports:  [ ContratosService]
})
export class ContratosModule {}
