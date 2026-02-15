import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { AssignRolesDto } from './dto/assign-role.dto';

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
    return this.rolerepo.find();
  }

 async assignRoles(userId: string, dto: AssignRolesDto) {
  const user = await this.userrepo.findOne({
    where: { id: userId },
    relations: ['roles'],
  });

  if (!user) throw new Error('Usuario no encontrado');

  const roles = await this.rolerepo.findByIds(dto.rolesIds);

  if (roles.length !== dto.rolesIds.length) {
    throw new Error('Uno o más roles no existen');
  }

  // Filtrar roles ya asignados
  const rolesToAdd = roles.filter(
    (role) => !user.roles.some((r) => r.id === role.id)
  );

  if (rolesToAdd.length === 0) {

  const plural = dto.rolesIds.length > 1
    ? 'Los roles estaban asignados'
    : 'El rol estaba asignado';

  return { message: plural };
}


  user.roles = [...user.roles, ...rolesToAdd];
  await this.userrepo.save(user);

  const plural = rolesToAdd.length > 1 ? 'Roles asignados correctamente' : 'Rol asignado correctamente';

  return { message: plural };
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
    relations: ['roles'],
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
