import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/admin/permissions/entities/permission.entity';
import { Role } from 'src/admin/roles/entities/role.entity';
import { User } from 'src/admin/users/entities/user.entity';
import { RolesSeeder } from './seeders/roles.seeder';
import { PermissionsSeeder } from './seeders/permissions.seeder';
import { CategoriasEspecialidadSeeder } from './seeders/categorias-especialidad.seeder';
import { EspecialidadesSeeder } from './seeders/especialidades.seeder';
import { CategoriasEspecialidad } from 'src/admin/especialidades/categorias_especialidads/entities/categorias_especialidad.entity';
import { Especialidad } from 'src/admin/especialidades/especialidads/entities/especialidad.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, Permission, Especialidad, CategoriasEspecialidad]),],
    providers: [RolesSeeder, PermissionsSeeder, CategoriasEspecialidadSeeder, EspecialidadesSeeder],
    exports: [RolesSeeder, PermissionsSeeder, CategoriasEspecialidadSeeder, EspecialidadesSeeder],

})
export class DatabaseModule {}
