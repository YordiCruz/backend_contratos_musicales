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

@Module({
    imports: [
    UsersModule,
    RolesModule,
    PermissionsModule,
    PersonasModule,
    EspecialidadesModule,
    ReemplazosModule,
    IntegrantesModule,
    CategoriasEspecialidadsModule
],


})
export class AdminModule {}
