import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {  DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FiltrosUserDto } from './dto/filtros-user.dto';
import { Persona } from '../personas/entities/persona.entity';
import { CreateUserDataDto } from './dto/create-user-data.dto';
import { UpdatePasswordUsersDto } from './dto/update-password-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userrepo: Repository<User>,

    @InjectRepository(Persona)
    private readonly personarepo: Repository<Persona>,

    @InjectDataSource()
    private readonly dataSource: DataSource

  ){}

  async create(createUserDto: CreateUserDto, user: any): Promise<User> {
  return await this.dataSource.transaction(async manager => {

    const { persona: personaDto, user: userDto } = createUserDto;

    // 1. Validar que el username no exista
    const existe = await manager.findOne(User, {
      where: { email: userDto.email }
    });

    if (existe) {
      throw new Error(`El usuario '${userDto.email}' ya existe`);
    }


    // 1. Validar que la persona no exista
    const exis = await manager.findOne(Persona, {
      where: { documento_identidad: personaDto.documento_identidad }
    });

    if (exis) {
      throw new Error(`La persona con documento '${personaDto.documento_identidad}' ya existe`);
    }

    // 2. Guardar persona
    const persona = await manager.save(Persona, personaDto);

    // 3. Preparar usuario
    const passwordHash = await bcrypt.hash(userDto.password_hash, 12);

    const nuevoUsuario = manager.create(User, {
      ...userDto,
      password_hash: passwordHash,
      persona,
      registrado_por: user?.id ? { id: user.id } : undefined
    });

    // 4. Guardar usuario
    return await manager.save(User, nuevoUsuario);
  });
}


  async findAll(
    filters: FiltrosUserDto
  ): Promise<ResponseUserDto[]> {
 
    const page = filters.page || 1;
    const limit = filters.limit || 10;
  
    const query = this.userrepo.createQueryBuilder('user')
  // Orden dinámico
  const sortField = filters.sort || 'user.creado_en';
  const sortOrder = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  query.orderBy(sortField, sortOrder);



    if (filters.search) {
      query.andWhere('user.username LIKE :search', {
        search: `%${filters.search}%`,
      });
    }

    if (filters.estado) {
      query.andWhere('user.estado = :estado', {
        estado: filters.estado,
      });
    }

    const users = await query
      .skip((page - 1) * limit)
      .take(filters.limit)
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.persona', 'persona')
      .getMany();

      

   return users.map(user => ({
    id: user.id,
    email: user.email,
    ultimo_login: user.ultimo_login,
    estado: user.estado,
    origen_registro: user.origen_registro,
    roles: user.roles.map(role => ({
      id: role.id,
      nombre: role.nombre,
      descripcion: role.descripcion
    })),
   persona: user.persona ? {
  id: user.persona.id,
  nombre: user.persona.nombre,
  apellido: user.persona.apellido,
  email: user.persona.email,
  telefono: user.persona.telefono,
  documento_identidad: user.persona.documento_identidad
   }: null
   
   })
  
  )
  }

  async findOne(id: string): Promise<User> {
    const usr = await this.userrepo.findOne({
      where: { id } });
   if(!usr) {
          throw new Error('Usuario no encontrado');
          
        }
   return usr;


 }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    const user = await this.userrepo.findOne({where :{id} })
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

      // ❗ Evitar que el DTO pise el ID
  if ('id' in updateUserDto) {
    delete (updateUserDto as any).id;
  }

  // ❗ Evitar que el DTO pise password_hash
  if ('password_hash' in updateUserDto) {
    delete (updateUserDto as any).password_hash;
  }




    const update = Object.assign(user, updateUserDto)
    const saved = await this.userrepo.save(update)
    if (!saved) {
  throw new Error('No se pudo actualizar el usuario');
}

    return {
      id: saved.id,
      email: saved.email,
      ultimo_login: saved.ultimo_login,
      estado: saved.estado,
      origen_registro: saved.origen_registro,
      persona: saved.persona
    }
  }


  async updatePassword(id: string, dto: UpdatePasswordDto) {
  const user = await this.userrepo.findOne({ where: { id } });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Si quieres validar la contraseña anterior:
  if (dto.oldpassword) {
    const isMatch = await bcrypt.compare(dto.oldpassword, user.password_hash);
    if (!isMatch) {
      throw new Error('La contraseña actual es incorrecta');
    }
  }

  // Hashear la nueva contraseña
  const hashed = await bcrypt.hash(dto.newpassword, 12);
  user.password_hash = hashed;

  await this.userrepo.save(user);

  return { message: 'Contraseña actualizada correctamente' };
}

// Actualización de contraseña de los usuarios
async updatePasswordUsers(id: string, dto: UpdatePasswordUsersDto) {
  const user = await this.userrepo.findOne({ where: { id } });
  if (!user) throw new NotFoundException('Usuario no encontrado');

  if (dto.newpassword && dto.newpassword.trim().length > 0) {
    user.password_hash = await bcrypt.hash(dto.newpassword, 12);
    await this.userrepo.save(user);
    return { message: 'Contraseña actualizada correctamente' };
  }

  // si no viene contraseña, solo permitimos actualizar otros datos (ej. correo/roles)
  return { message: 'Contraseña no cambiada, otros datos pueden actualizarse' };
}
 async remove(id: string) {
  const user = await this.userrepo.findOne({ where: { id } });

  if (!user) {
    throw new NotFoundException('Usuario no encontrado');
  }

  user.estado = 'inactivo';
  user.eliminado_en = new Date();
  await this.userrepo.save(user);

  return { message: 'Usuario desactivado correctamente' };
}


async createUserFromExistingPersona(idPersona: string, dto: CreateUserDataDto) {
  const persona = await this.personarepo.findOne({ where: { id: idPersona } });

  if (!persona) {
    throw new NotFoundException('La persona no existe');
  }

  // Verificar que no tenga ya un usuario
  const existingUser = await this.userrepo.findOne({ where: { persona: { id: idPersona } } });
  if (existingUser) {
    throw new BadRequestException('Esta persona ya tiene un usuario asignado');
  }

  const user = this.userrepo.create({
    ...dto,
    persona,
  });

  return await this.userrepo.save(user);
}


//activar usuario 
async activar(id: string) {
  const user = await this.userrepo.findOne({ where: { id } });

  if (!user) {
    throw new NotFoundException('Usuario no encontrado');
  }

  user.estado = 'activo';
  user.eliminado_en = null; // opcional: limpiar la fecha de inactivación
  await this.userrepo.save(user);

  return { message: 'Usuario reactivado correctamente', user };
}


}
