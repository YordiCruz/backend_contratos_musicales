import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Throttle } from '@nestjs/throttler';
import { AdminJwtGuard } from './guards/admin-jwt.guard';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('login')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async login(@Body() dto: AdminLoginDto) {
    return this.adminAuthService.login(dto);
  }

  @Get('profile')
@UseGuards(AdminJwtGuard)
async getProfile(@Req() req) {
  return this.adminAuthService.getProfile(req.user.id);
}


}
