import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor() {

    const secret = process.env.JWT_ADMIN_SECRET

    if (!secret) {
      throw new Error('Falta la variable de entorno JWT_ADMIN_SECRET');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // SECRET EXCLUSIVO PARA ADMIN
    });
  }

  async validate(payload: any) {
    // Lo que devuelvas aquí estará disponible en req.user
    return {
      id: payload.id,
      username: payload.username,
      roles: payload.roles,
    };
  }
}