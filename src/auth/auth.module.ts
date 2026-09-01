import { Module } from '@nestjs/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { ClientAuthModule } from './client-auth/client-auth.module';

@Module({

  imports: [ 
    AdminAuthModule, 
    ClientAuthModule]
})
export class AuthModule {}
