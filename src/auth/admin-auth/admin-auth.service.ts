import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/admin/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AdminLoginDto } from './dto/admin-login.dto';

@Injectable()
export class AdminAuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

   async login(dto: AdminLoginDto) {
    const { username, password } = dto;

    // 1. Buscar usuario
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['roles'],
    });

    // 2. Validación inicial (sin lógica de bcrypt aún)
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Validar que sea admin (lógica real la haremos en el paso C)
    const isAdmin = user.roles.some((r) => r.nombre === 'admin');

    if (!isAdmin) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return {

  message: 'Login de admin OK (falta implementar seguridad)',
    };
  }
}
