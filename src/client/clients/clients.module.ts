import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Persona } from 'src/admin/personas/entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Persona])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
