import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './admin/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'process';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './admin/roles/roles.module';
import { RolesSeeder } from './database/seeders/roles.seeder';
import { Role } from './admin/roles/entities/role.entity';
import { PermissionsModule } from './admin/permissions/permissions.module';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
     ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true
     }),
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    // TypeOrmModule.forFeature([Role]),

    // UsersModule,
    // RolesModule,
    // PermissionsModule,
    AdminModule,

    DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
