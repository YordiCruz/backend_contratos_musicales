import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Persona, User])],
  providers: [PersonasService],
  exports:[PersonasService]
})
export class PersonasModule {}
