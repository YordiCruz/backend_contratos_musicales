import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { AssignRolesDto } from './dto/assign-role.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolerepo: Repository<Role>,
    @InjectRepository(User)
    private readonly userrepo: Repository<User>
  ){}

  // Seeder : datos definidos
  


  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll() {
    return this.rolerepo.find({
      relations: {
        permissions: true
      }
        ,});
  }

 
  async assignRole(userId: string, dto: AssignRolesDto) {

  const user = await this.userrepo.findOne({
    where: { id: userId },
    relations: {
      roles: true
    }
  });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }


  const role = await this.rolerepo.findOne({
    where: {
      id: dto.rolesIds
    }
  });

  if (!role) {
    throw new Error('El rol no existe');
  }


  user.roles = [role];

  await this.userrepo.save(user);

  return {
    message: 'Rol asignado correctamente'
  };
}



  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

async removeRole(userId: string, roleId: string) {
  const user = await this.userrepo.findOne({
    where: { id: userId },
    relations: {
      roles: true
    },
  });

  if (!user) throw new Error('Usuario no encontrado');

  const hasRole = user.roles.some((role) => role.id === roleId);

  if (!hasRole) {
    return { message: 'El usuario no tiene asignado este rol' };
  }

  user.roles = user.roles.filter((role) => role.id !== roleId);
  await this.userrepo.save(user);

  return { message: 'Rol removido correctamente' };
}



}
