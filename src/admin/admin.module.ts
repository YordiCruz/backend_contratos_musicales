import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Permission } from './permissions/entities/permission.entity';
import { Role } from './roles/entities/role.entity';
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
import { EspecialidadsModule } from './especialidades/especialidads/especialidads.module';
import { EspecialidadsController } from './especialidades/especialidads/especialidads.controller';
import { EventosModule } from './eventos/eventos.module';
import { DisponibilidadModule } from './disponibilidad/disponibilidad.module';
import { DisponibilidadEventosModule } from './disponibilidad-eventos/disponibilidad-eventos.module';

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
    DisponibilidadModule,
    DisponibilidadEventosModule
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
