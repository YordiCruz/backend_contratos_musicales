import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminLoginDto } from './dto/admin-login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../admin/users/entities/user.entity';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AdminLoginDto) {
    const { email, password } = dto;

    const user = await this.userRepository.findOne({
      where: { email },
      relations: { roles: true, persona: true },
    });

    if (!user) {
      await bcrypt.compare(password, '$2b$10$invalidinvalidinvalidinvalidinv');
      throw new BadRequestException('Credenciales inválidas');
    }

    const isAdmin = user.roles.some((r) => r.nombre === 'admin');
    if (!isAdmin) {
      throw new BadRequestException('Credenciales inválidas');
    }

    if (user.estado !== 'activo' || user.eliminado_en) {
      throw new BadRequestException('Credenciales inválidas');
    }

    const passwordOk = await bcrypt.compare(password, user.password_hash);
    if (!passwordOk) {
      throw new BadRequestException('Credenciales inválidas');
    }

    user.ultimo_login = new Date();

    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles.map((r) => r.nombre),
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ADMIN_SECRET,
      expiresIn: '2m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ADMIN_REFRESH_SECRET,
      expiresIn: '7d',
    });

    // 🔥 guardar refresh token en BD
    user.refresh_token = refreshToken;

    await this.userRepository.save(user);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.roles[0].nombre,
        persona: {
          nombre: user.persona.nombre,
          apellido: user.persona.apellido,
          ci: user.persona.documento_identidad,
          telefono: user.persona.telefono,
          email: user.persona.email,
        },
      },
    };
  }

  // private generarToken(user: User) {
  //   const payload = {
  //     id: user.id,
  //     email: user.email,
  //     roles: user.roles.map(r => r.nombre),
  //   };

  //   return this.jwtService.sign(payload, {
  //     secret: process.env.JWT_ADMIN_SECRET,
  //     expiresIn: '15m',   // ✅ expira en 15 minutos
  //   });
  // }

  async refresh(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_ADMIN_REFRESH_SECRET,
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.id },
      });

      if (!user || user.refresh_token !== token) {
        throw new UnauthorizedException('Refresh token inválido');
      }

      const newPayload = {
        id: user.id,
        email: user.email,
        roles: payload.roles,
      };

      const newAccessToken = this.jwtService.sign(newPayload, {
        secret: process.env.JWT_ADMIN_SECRET,
        expiresIn: '15m',
      });

      const newRefreshToken = this.jwtService.sign(newPayload, {
        secret: process.env.JWT_ADMIN_REFRESH_SECRET,
        expiresIn: '7d',
      });

      // Guardar el nuevo refresh token
      user.refresh_token = newRefreshToken;

      await this.userRepository.save(user);

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  async logout(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // 🔥 invalidar sesión
    user.refresh_token = '';

    await this.userRepository.save(user);

    return {
      message: 'Logout exitoso',
    };
  }

  async getProfile(userId: string) {
    const admin = await this.userRepository.findOne({
      where: { id: userId },
      relations: { persona: true, roles: true }, // relación con persona
    });

    if (!admin) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.roles[0].nombre, // un solo rol, no array
        persona: {
          nombre: admin.persona.nombre,
          apellido: admin.persona.apellido,
          ci: admin.persona.documento_identidad,
          telefono: admin.persona.telefono,
          email: admin.persona.email,
        },
      },
    };
  }
}
