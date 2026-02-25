import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientAuthService } from './client-auth.service';
import { UpdateClientAuthDto } from './dto/update-client-auth.dto';
import { Throttle } from '@nestjs/throttler';
import { ClientLoginDto } from './dto/client-login.dto';

@Controller('client-auth')
export class ClientAuthController {
  constructor(private readonly clientAuthService: ClientAuthService) {}

  @Post('login')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async login(@Body() dto: ClientLoginDto) {
      return this.clientAuthService.login(dto);
  }

 
}
