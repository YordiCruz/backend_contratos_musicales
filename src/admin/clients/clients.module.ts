import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Persona } from '../personas/entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Persona])],
  providers: [ClientsService],
  //controllers: [ClientsController],
  exports: [ClientsService]
})
export class ClientsModule {}
