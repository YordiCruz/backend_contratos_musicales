import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { RouterModule } from '@nestjs/core';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
     ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),

    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
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

    ClientModule,

    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
      {
        path: 'client',
        module: ClientModule,
      },
    ]),

    
    DatabaseModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
