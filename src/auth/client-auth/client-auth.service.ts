import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientLoginDto } from './dto/client-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../admin/users/entities/user.entity';
import { CreateUserDto } from '../../admin/users/dto/create-user.dto';
import { Persona } from '../../admin/personas/entities/persona.entity';
import { Role } from '../../admin/roles/entities/role.entity';
import { DataSource } from 'typeorm';
import { Client } from '../../admin/clients/entities/client.entity';

@Injectable()
export class ClientAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Client)
    private readonly clienteRepo: Repository<Client>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async login(dto: ClientLoginDto) {
    const { email, password } = dto;

    const user = await this.userRepository.findOne({
      withDeleted: true,
      where: { email },
      relations: { roles: true, persona: true },
    });

    if (!user) {
      await bcrypt.compare(password, '$2b$10$invalidinvalidinvalidinvalidinv');
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isClient = user.roles.some((r) => r.nombre === 'cliente');
    if (!isClient) throw new UnauthorizedException('Credenciales inválidas');

    if (user.estado === 'inactivo') {
      throw new UnauthorizedException(
        'Su cuenta se encuentra inactiva. Contactese con el administrador.',
      );
    }
    if (user.eliminado_en)
      throw new UnauthorizedException('Credenciales inválidas');

    const passwordOk = await bcrypt.compare(password, user.password_hash);
    if (!passwordOk) throw new UnauthorizedException('Credenciales inválidas');

    user.ultimo_login = new Date();

    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles.map((r) => r.nombre),
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_CLIENT_SECRET,
      expiresIn: '2m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_CLIENT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    // 🔥 AQUÍ LO IMPORTANTE
    user.refresh_token = refreshToken;
    await this.userRepository.save(user);

    const cliente = await this.clienteRepo.findOne({
      where: {
        persona: {
          id: user.persona.id,
        },
      },
      relations: { persona: true },
    });

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
      password_temporal: user.password_temporal,

      cliente: cliente
        ? {
            id: cliente.id,
            tipo_cliente: cliente.tipo_cliente,
            preferencia_contacto: cliente.preferencia_contacto,
          }
        : null,
    };
  }

  // private generarToken(user: User) {
  //   const payload = {
  //     id: user.id,
  //     email: user.email,
  //     roles: user.roles.map(r => r.nombre),
  //   };

  //   return this.jwtService.sign(payload);
  // }

  async refresh(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_CLIENT_REFRESH_SECRET,
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.id },
      });

      // 🔥 VALIDACIÓN REAL
      if (!user || user.refresh_token !== token) {
        throw new UnauthorizedException('Token inválido');
      }

      const newPayload = {
        id: user.id,
        email: user.email,
        roles: payload.roles,
      };

      const newAccessToken = this.jwtService.sign(newPayload, {
        secret: process.env.JWT_CLIENT_SECRET,
        expiresIn: '15m',
      });

      const newRefreshToken = this.jwtService.sign(newPayload, {
        secret: process.env.JWT_CLIENT_REFRESH_SECRET,
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

    // 🔥 invalidar refresh token
    user.refresh_token = '';

    await this.userRepository.save(user);

    return {
      message: 'Logout exitoso',
    };
  }

  async getProfile(userId: string) {
    const cliente = await this.userRepository.findOne({
      where: { id: userId },
      relations: { persona: true, roles: true }, // relación con persona
    });

    if (!cliente) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      user: {
        id: cliente.id,
        email: cliente.email,
        role: cliente.roles[0].nombre, // un solo rol, no array
        persona: {
          nombre: cliente.persona.nombre,
          apellido: cliente.persona.apellido,
          ci: cliente.persona.documento_identidad,
          telefono: cliente.persona.telefono,
          email: cliente.persona.email,
        },
      },
    };
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    return await this.dataSource.transaction(async (manager) => {
      const {
        persona: personaDto,
        user: userDto,
        cliente: clienteDto,
      } = createUserDto;

      // =====================================================
      // 1. Validar email usuario duplicado
      // =====================================================

      const usuarioExistente = await manager.findOne(User, {
        where: {
          email: userDto.email,
        },
      });

      if (usuarioExistente) {
        throw new BadRequestException(
          `El usuario '${userDto.email}' ya existe`,
        );
      }

      // =====================================================
      // 2. Buscar persona existente por CI
      // =====================================================

      let persona = await manager.findOne(Persona, {
        where: {
          documento_identidad: personaDto.documento_identidad,
        },
      });

      let clienteExistente: Client | null = null;

      let usuarioPersonaExistente: User | null = null;

      // =====================================================
      // 3. SI EXISTE PERSONA
      // =====================================================

      // if (persona) {
      //   // -----------------------------------------------
      //   // Validar identidad
      //   // CI coincide pero verificamos datos
      //   // -----------------------------------------------

      //   if (
      //     persona.nombre !== personaDto.nombre ||
      //     persona.apellido !== personaDto.apellido
      //   ) {
      //     throw new BadRequestException(
      //       'Los datos ingresados no coinciden con el registro existente',
      //     );
      //   }

      //   // -----------------------------------------------
      //   // Buscar usuario asociado
      //   // -----------------------------------------------

      //   usuarioPersonaExistente = await manager.findOne(User, {
      //     where: {
      //       persona: {
      //         id: persona.id,
      //       },
      //     },
      //   });

      //   if (usuarioPersonaExistente) {
      //     throw new BadRequestException(
      //       'Esta persona ya tiene una cuenta registrada',
      //     );
      //   }

      //   // -----------------------------------------------
      //   // Buscar cliente asociado
      //   // -----------------------------------------------

      //   clienteExistente = await manager.findOne(Client, {
      //     where: {
      //       persona: {
      //         id: persona.id,
      //       },
      //     },

      //     relations: {
      //       user: true,
      //     },
      //   });
      // }

      if (persona) {

  // Validar identidad básica
  if (
    persona.nombre !== personaDto.nombre ||
    persona.apellido !== personaDto.apellido
  ) {
    throw new BadRequestException(
      'El nombre y apellido no coinciden con el registro existente',
    );
  }

  // Actualizar datos de contacto
  persona.telefono = personaDto.telefono;
  persona.email = personaDto.email;

  await manager.save(Persona, persona);

  // Buscar usuario asociado
  usuarioPersonaExistente = await manager.findOne(User, {
    where: {
      persona: {
        id: persona.id,
      },
    },
  });

  if (usuarioPersonaExistente) {
    throw new BadRequestException(
      'Esta persona ya tiene una cuenta registrada',
    );
  }

  // Buscar cliente asociado
  clienteExistente = await manager.findOne(Client, {
    where: {
      persona: {
        id: persona.id,
      },
    },
    relations: {
      user: true,
    },
  });
}
      // =====================================================
      // 4. SI NO EXISTE PERSONA CREARLA
      // =====================================================

      if (!persona) {
        persona = manager.create(Persona, personaDto);

        persona = await manager.save(Persona, persona);
      }

      // =====================================================
      // 5. Hash password
      // =====================================================

      const passwordHash = await bcrypt.hash(userDto.password_hash, 12);

      // =====================================================
      // 6. Obtener rol cliente
      // =====================================================

      const rolCliente = await manager.findOne(Role, {
        where: {
          nombre: 'cliente',
        },
      });

      if (!rolCliente) {
        throw new BadRequestException('Rol cliente no configurado');
      }

      // =====================================================
      // 7. Crear usuario
      // =====================================================

      const nuevoUsuario = manager.create(User, {
        email: userDto.email,

        password_hash: passwordHash,

        persona,

        roles: [rolCliente],

        origen_registro: 'cliente',

        estado: 'activo',
      });

      const userGuardado = await manager.save(User, nuevoUsuario);

      // =====================================================
      // 8. Crear o actualizar cliente
      // =====================================================

      let clienteGuardado: Client;

      if (clienteExistente) {
        // Cliente presencial existente

        clienteExistente.user = userGuardado;

        clienteGuardado = await manager.save(Client, clienteExistente);
      } else {
        const nuevoCliente = manager.create(Client, {
          user: userGuardado,

          persona,

          tipo_cliente: clienteDto.tipo_cliente,

          preferencia_contacto: clienteDto.preferencia_contacto,

          origen_registro: 'web',

          estado: 'activo',
        });

        clienteGuardado = await manager.save(Client, nuevoCliente);
      }

      // =====================================================
      // 9. Respuesta
      // =====================================================

      return {
        message: 'Cliente registrado correctamente',

        user: {
          id: userGuardado.id,

          email: userGuardado.email,
        },

        cliente: {
          id: clienteGuardado.id,

          tipo_cliente: clienteGuardado.tipo_cliente,

          preferencia_contacto: clienteGuardado.preferencia_contacto,
        },
      };
    });
  }
}
