import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/admin/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AdminLoginDto } from './dto/admin-login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AdminLoginDto) {
    const { email, password } = dto;

    // 1. Buscar usuario
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles','persona'],
    });

    // 2. Protección contra timing attacks
    // Si el usuario no existe, hacemos un compare falso para igualar tiempos
    if (!user) {
      await bcrypt.compare(password, '$2b$10$invalidinvalidinvalidinvalidinv'); 
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Validar que sea admin
    const isAdmin = user.roles.some((r) => r.nombre === 'admin');
    if (!isAdmin) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 4. Validar estado del usuario
    if (user.estado !== 'activo') {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 5. Validar que no esté eliminado (soft delete)
    if (user.eliminado_en) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 6. Validar contraseña real
    const passwordOk = await bcrypt.compare(password, user.password_hash);
    if (!passwordOk) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 7. Actualizar último login
    user.ultimo_login = new Date();
    await this.userRepository.save(user);

    //console.log('SECRET ADMIN:', process.env.JWT_ADMIN_SECRET);

    // Payload para el JWT
  const payload = {
    id: user.id,
    email: user.email,
    roles: user.roles.map(r => r.nombre),
  };

  // Access token con expiración corta
  const accessToken = this.jwtService.sign(payload, {
    secret: process.env.JWT_ADMIN_SECRET,
    expiresIn: '15m',
  });

  // Refresh token con expiración larga
  const refreshToken = this.jwtService.sign(payload, {
    secret: process.env.JWT_ADMIN_REFRESH_SECRET,
    expiresIn: '7d',
  });


    // 8. Generar token
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
      email: user.persona.email
    }
  }
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

    const newAccessToken = this.jwtService.sign(
      { id: payload.id, email: payload.email, roles: payload.roles },
      { secret: process.env.JWT_ADMIN_SECRET, expiresIn: '15m' }
    );

    return { access_token: newAccessToken };
  } catch {
    throw new UnauthorizedException('Refresh token inválido o expirado');
  }
}


  async getProfile(userId: string) {
  const admin = await this.userRepository.findOne({
    where: { id: userId },
    relations: ['persona', 'roles'], // relación con persona
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
      email: admin.persona.email
    }
  }
};
}

}