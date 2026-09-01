import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesSeeder } from './seeders/roles.seeder';
import { PermissionsSeeder } from './seeders/permissions.seeder';
import { CategoriasEspecialidadSeeder } from './seeders/categorias-especialidad.seeder';
import { EspecialidadesSeeder } from './seeders/especialidades.seeder';
import { ServicioEspecialidadSeeder } from './seeders/tipo-servicio-especialidades.seeder';
import { User } from '../admin/users/entities/user.entity';
import { Role } from '../admin/roles/entities/role.entity';
import { Permission } from '../admin/permissions/entities/permission.entity';
import { Especialidad } from '../admin/especialidades/especialidads/entities/especialidad.entity';
import { CategoriasEspecialidad } from '../admin/especialidades/categorias_especialidads/entities/categorias_especialidad.entity';
import { TipoServicioEspecialidad } from '../admin/contratos/entities/tipo-servicio-especialidad.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, Permission, Especialidad, CategoriasEspecialidad, TipoServicioEspecialidad]),],
    providers: [RolesSeeder, PermissionsSeeder, CategoriasEspecialidadSeeder, EspecialidadesSeeder, ServicioEspecialidadSeeder],
    exports: [RolesSeeder, PermissionsSeeder, CategoriasEspecialidadSeeder, EspecialidadesSeeder, ServicioEspecialidadSeeder],

})
export class DatabaseModule {}
