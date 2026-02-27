import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignRolesDto } from './dto/assign-role.dto';
import { RemoveRoleDto } from './dto/remove-role.dto';
import { AdminJwtGuard } from 'src/auth/admin-auth/guards/admin-jwt.guard';

@UseGuards(AdminJwtGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

   @Get()
  findAll() {
    return this.rolesService.findAll();
  }

 

  @Delete(':userId/remove')
  removeRole(
    @Param('userId') userId: string,
    @Body() dto: RemoveRoleDto,
  ) {
    return this.rolesService.removeRole(userId, dto.roleId);
  }

   @Post('assign-roles/:userId')
  assignRoles(@Param('userId') userId: string, @Body() dto: AssignRolesDto) {
    return this.rolesService.assignRoles(userId, dto);
  }


}
