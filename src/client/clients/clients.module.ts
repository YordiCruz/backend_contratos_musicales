import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Persona } from '../../admin/personas/entities/persona.entity';
import { User } from '../../admin/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Persona, User])],
  providers: [ClientsService],
  exports: [ClientsService]
})
export class ClientsModule {}
