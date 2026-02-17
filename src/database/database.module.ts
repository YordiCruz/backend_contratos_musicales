import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/admin/permissions/entities/permission.entity';
import { Role } from 'src/admin/roles/entities/role.entity';
import { User } from 'src/admin/users/entities/user.entity';
import { RolesSeeder } from './seeders/roles.seeder';
import { PermissionsSeeder } from './seeders/permissions.seeder';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, Permission]),],
    providers: [RolesSeeder, PermissionsSeeder],
    exports: [RolesSeeder, PermissionsSeeder],

})
export class DatabaseModule {}
