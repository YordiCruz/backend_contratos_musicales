import { Module } from '@nestjs/common';
import { ClientAuthService } from './client-auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ClientJwtStrategy } from './strategies/client-jwt.strategy';
import { ClientJwtGuard } from './guards/client-jwt.guard';
import { User } from '../../admin/users/entities/user.entity';
import { Role } from '../../admin/roles/entities/role.entity';
import { Persona } from '../../admin/personas/entities/persona.entity';
import { Client } from '../../client/clients/entities/client.entity';

@Module({
  imports: [

    ConfigModule,
    TypeOrmModule.forFeature([User, Persona, Role, Client]),

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
