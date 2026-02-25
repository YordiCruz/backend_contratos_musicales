import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from 'src/admin/users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Role, User])],
  providers: [RolesService],
  exports:[RolesService]
  
})
export class RolesModule {}
