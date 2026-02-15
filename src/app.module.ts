import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'process';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { RolesSeeder } from './seeders/roles.seeder';
import { Role } from './roles/entities/role.entity';

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

    TypeOrmModule.forFeature([Role]),

    UsersModule,
    RolesModule],
  controllers: [AppController],
  providers: [AppService, RolesSeeder],
})
export class AppModule {}
