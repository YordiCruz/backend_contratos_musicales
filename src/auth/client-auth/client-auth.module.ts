import { Module } from '@nestjs/common';
import { ClientAuthService } from './client-auth.service';
import { ClientAuthController } from './client-auth.controller';

@Module({
  controllers: [ClientAuthController],
  providers: [ClientAuthService],
})
export class ClientAuthModule {}
