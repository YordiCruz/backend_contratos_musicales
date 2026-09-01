import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../admin/users/entities/user.entity';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    const secret = process.env.JWT_ADMIN_SECRET;

    if (!secret) {
      throw new Error('Falta JWT_ADMIN_SECRET');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOne({
      where: { id: payload.id },
      relations: { roles: true },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no válido');
    }

    if (user.estado !== 'activo' || user.eliminado_en) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const isAdmin = user.roles.some(r => r.nombre === 'admin');
    if (!isAdmin) {
      throw new UnauthorizedException('No autorizado');
    }

    return {
      id: user.id,
      email: user.email,
      roles: user.roles.map(r => r.nombre),
    };
  }
}