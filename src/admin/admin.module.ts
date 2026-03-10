import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PersonasModule } from './personas/personas.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { ReemplazosModule } from './reemplazos/reemplazos.module';
import { IntegrantesModule } from './integrantes/integrantes.module';
import { CategoriasEspecialidadsModule } from './especialidades/categorias_especialidads/categorias_especialidads.module';
import { AdminAuthModule } from 'src/auth/admin-auth/admin-auth.module';
import { UsersController } from './users/users.controller';
import { RolesController } from './roles/roles.controller';
import { PersonasController } from './personas/personas.controller';
import { ReemplazosController } from './reemplazos/reemplazos.controller';
import { IntegrantesController } from './integrantes/integrantes.controller';
import { CategoriasEspecialidadsController } from './especialidades/categorias_especialidads/categorias_especialidads.controller';
import { AdminAuthController } from 'src/auth/admin-auth/admin-auth.controller';
import { EspecialidadsController } from './especialidades/especialidads/especialidads.controller';
import { EventosModule } from './eventos/eventos.module';
import { DisponibilidadEventosModule } from './disponibilidad-eventos/disponibilidad-eventos.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { EmailModule } from './email/email.module';
import { PagosModule } from './pagos/pagos.module';

@Module({
    imports: [
    UsersModule,
    RolesModule,
    PermissionsModule,
    PersonasModule,
    EspecialidadesModule,
    ReemplazosModule,
    IntegrantesModule,
    CategoriasEspecialidadsModule,
    AdminAuthModule,
    EventosModule,
    DisponibilidadEventosModule,
    NotificacionesModule,
    EmailModule,
    PagosModule
],

controllers:[
    UsersController,
    RolesController,
    PersonasController,
    ReemplazosController,
    EspecialidadsController,
    IntegrantesController,
    CategoriasEspecialidadsController,
    AdminAuthController,

]


})
export class AdminModule {}
