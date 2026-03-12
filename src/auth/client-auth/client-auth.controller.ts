import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ClientAuthService } from './client-auth.service';
import { UpdateClientAuthDto } from './dto/update-client-auth.dto';
import { Throttle } from '@nestjs/throttler';
import { ClientLoginDto } from './dto/client-login.dto';
import { ClientJwtGuard } from './guards/client-jwt.guard';

@Controller('client-auth')
export class ClientAuthController {
  constructor(private readonly clientAuthService: ClientAuthService) {}

  @Post('login')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async login(@Body() dto: ClientLoginDto) {
      return this.clientAuthService.login(dto);
  }

  @Get('profile')
  @UseGuards(ClientJwtGuard)
  async getProfile(@Req() req) {
    return this.clientAuthService.getProfile(req.user.id);
  }

  @Post('refresh')
async refresh(@Body('refreshToken') token: string) {
  return this.clientAuthService.refresh(token);
}
 
}
