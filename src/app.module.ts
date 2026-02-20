import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './database/database.module';
import { ClientsModule } from './client/clients/clients.module';



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


    
    AdminModule,

    DatabaseModule,

    ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
