import { forwardRef, Module } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contrato } from './entities/contrato.entity';
import { DisponibilidadEvento } from '../disponibilidad-eventos/entities/disponibilidad-evento.entity';
import { ContratoIntegrante } from './entities/contrato-integrante.entity';
import { ContratoReemplazo } from './entities/contrato-reemplazo.entity';
import { Ubicacion } from './entities/ubicacion.entity';
import { UbicacionService } from './ubicacion.service';
import { Notificacione } from '../notificaciones/entities/notificacione.entity';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';
import { Persona } from '../personas/entities/persona.entity';
import { User } from '../users/entities/user.entity';
import { TipoServicioEspecialidad } from './entities/tipo-servicio-especialidad.entity';
import { Integrante } from '../integrantes/entities/integrante.entity';
import { Reemplazo } from '../reemplazos/entities/reemplazo.entity';
import { DistanciaService } from './distancia.service';
import { DatosEmpresaModule } from '../datos-empresa/datos-empresa.module';
import { DatosEmpresa } from '../datos-empresa/entities/datos-empresa.entity';
import { Client } from '../clients/entities/client.entity';
import { Pago } from '../pagos/entities/pago.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contrato,
      DisponibilidadEvento,
      ContratoIntegrante,
      ContratoReemplazo,
      Ubicacion,
      Notificacione,
      Persona,
      User,
      TipoServicioEspecialidad,
      Integrante,
      Reemplazo,
      DatosEmpresa,
      Client,
      Pago
    ]),
    forwardRef(() => NotificacionesModule),
    DatosEmpresaModule,
  ],
  providers: [
    ContratosService,
    UbicacionService,
    DistanciaService,
  ],
  exports: [
    ContratosService,
    UbicacionService,
    DistanciaService,
  ],
})
export class ContratosModule {}
