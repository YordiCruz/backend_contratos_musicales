import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import { AdminJwtGuard } from './guards/admin-jwt.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../admin/users/entities/user.entity';

@Module({
  imports: [
    
    ConfigModule, //necesario para jwtmodule
    
    TypeOrmModule.forFeature([User]),



    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        
        secret: configService.get('JWT_ADMIN_SECRET'),
        signOptions: { expiresIn: '15m' }, // expiración corta para admins
        
      })
    }),


  ],
  providers: [
    AdminAuthService,
    AdminJwtStrategy,
    AdminJwtGuard

  ],
  //controllers: [AdminAuthController],
  exports: [
    AdminAuthService,
    AdminJwtStrategy,
  
  ],
})
export class AdminAuthModule {}
