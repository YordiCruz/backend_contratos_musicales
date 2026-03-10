import { Controller, Post, Body } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('login')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async login(@Body() dto: AdminLoginDto) {
    return this.adminAuthService.login(dto);
  }



}
