import { Module } from '@nestjs/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { ClientAuthModule } from './client-auth/client-auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/admin/users/entities/user.entity';

@Module({

  imports: [ 
    AdminAuthModule, 
    ClientAuthModule]
})
export class AuthModule {}
