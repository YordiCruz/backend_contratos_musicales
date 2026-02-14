import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FiltrosUserDto } from './dto/filtros-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userrepo: Repository<User>
  ){}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userrepo.create(createUserDto)
    const password = createUserDto.password_hash

    const hash = await bcrypt.hash(password, 12)
    user.password_hash = hash
    
    return await this.userrepo.save(user)
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
      .getMany();

   return users.map(user => ({
    id: user.id,
    username: user.username,
    ultimo_login: user.ultimo_login,
    estado: user.estado,
    origen_registro: user.origen_registro

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
      username: saved.username,
      ultimo_login: saved.ultimo_login,
      estado: saved.estado,
      origen_registro: saved.origen_registro
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

 async remove(id: string) {
  const user = await this.userrepo.findOne({ where: { id } });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  user.estado = 'inactivo';
  user.deleted_at = new Date();
  await this.userrepo.save(user);

  return { message: 'Usuario desactivado correctamente' };
}
}
