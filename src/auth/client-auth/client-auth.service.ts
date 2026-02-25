import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/admin/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientLoginDto } from './dto/client-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class ClientAuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,


  ){}

 async login(dto: ClientLoginDto) {
    const { username, password } = dto;

    // 1. Buscar usuario
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['roles'],
    });

    // 2. Protección contra timing attacks
    // Si el usuario no existe, hacemos un compare falso para igualar tiempos
    if (!user) {
      await bcrypt.compare(password, '$2b$10$invalidinvalidinvalidinvalidinv'); 
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Validar que sea client
    const isClient = user.roles.some((r) => r.nombre === 'cliente');
    if (!isClient) {
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

    // 8. Generar token
    return {
      access_token: this.generarToken(user),
    };
  }

  private generarToken(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
      roles: user.roles.map(r => r.nombre),
    };

    return this.jwtService.sign(payload);
  }
}
