import { Module } from '@nestjs/common';
import { ClientAuthService } from './client-auth.service';
import { ClientAuthController } from './client-auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/admin/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ClientJwtStrategy } from './strategies/client-jwt.strategy';
import { ClientJwtGuard } from './guards/client-jwt.guard';

@Module({
  imports: [

    ConfigModule,
    TypeOrmModule.forFeature([User]),

    JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            
            secret: configService.get('JWT_CLIENT_SECRET'),
            signOptions: { expiresIn: '15m' }, // expiración corta para admins
            
          })
        }),


  ],
  providers: [
    ClientAuthService,
    ClientJwtStrategy,
    ClientJwtGuard

  ],

  exports: [
    ClientAuthService,
    ClientJwtStrategy
  ]
})
export class ClientAuthModule {}
