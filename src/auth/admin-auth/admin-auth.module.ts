import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { User } from 'src/admin/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import { AdminJwtGuard } from './guards/admin-jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret: process.env.JWT_ADMIN_SECRET,
      signOptions: { expiresIn: '15m' }, // expiración corta para admins
    }),


  ],
  controllers: [AdminAuthController],
  providers: [
    AdminAuthService,
    AdminJwtStrategy,
    AdminJwtGuard

  ],
  exports: [AdminAuthService],
})
export class AdminAuthModule {}
