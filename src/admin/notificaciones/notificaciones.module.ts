import { forwardRef, Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { ContratosModule } from '../contratos/contratos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacione } from './entities/notificacione.entity';
import { Contrato } from '../contratos/entities/contrato.entity';
import { Persona } from '../personas/entities/persona.entity';
import { EmailService } from '../email/email.service';
import { PersonasModule } from '../personas/personas.module';
import { IntegranteEspecialidad } from '../integrantes/entities/integrante-especialidad.entity';
import { Integrante } from '../integrantes/entities/integrante.entity';
import { TipoServicioEspecialidad } from '../contratos/entities/tipo-servicio-especialidad.entity';
import { Reemplazo } from '../reemplazos/entities/reemplazo.entity';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Notificacione, Contrato, Persona, IntegranteEspecialidad, Integrante, TipoServicioEspecialidad, Reemplazo],),
  forwardRef(() => ContratosModule),
  PersonasModule
],
  controllers: [NotificacionesController],
  providers: [NotificacionesService, EmailService],
  exports: [NotificacionesService],
})
export class NotificacionesModule {}
