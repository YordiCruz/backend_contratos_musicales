import { Injectable, UnauthorizedException } from '@nestjs/common';
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
      relations: ['roles'],
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

    console.log('SECRET ADMIN:', process.env.JWT_ADMIN_SECRET);

    // 8. Generar token
    return {
      access_token: this.generarToken(user),
    };
  }

  private generarToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles.map(r => r.nombre),
    };

    return this.jwtService.sign(payload);
  }


 async profile(user: any) {
  const admin = await this.userRepository.findOne({
    where: { id: user.id },
    relations: ['persona', 'roles'],
  });

  return {
    id: admin?.id,
    username: admin?.username,
    persona: {
      nombre: admin?.persona.nombre,
      apellido: admin?.persona.apellido,
      documento_identidad: admin?.persona.documento_identidad,
      email: admin?.persona.email,
      telefono: admin?.persona.telefono,
    },
    roles: admin?.roles.map(r => r.nombre),
  };
}



}