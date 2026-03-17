import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FiltrosUserDto } from './dto/filtros-user.dto';
import { CreateUserDataDto } from './dto/create-user-data.dto';
import { AdminJwtGuard } from 'src/auth/admin-auth/guards/admin-jwt.guard';
import { UpdatePasswordUsersDto } from './dto/update-password-users.dto';

@UseGuards(AdminJwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,


  ) {}

  @Post()
  create(@Req() req, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto, req.user);
  }

  @Get()
  findAll(@Query() filters: FiltrosUserDto) {
    return this.usersService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id/editar')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/password')
  updatepassword(
    @Param('id') id: string,
    @Body() updateDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(id, updateDto);
  }

   @Patch(':id/passwordUsers')
  updatepasswordusers(
    @Param('id') id: string,
    @Body() updateDto: UpdatePasswordUsersDto,
  ) {
    return this.usersService.updatePasswordUsers(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

 
  @Post('from-persona/:idPersona')
createUserFromPersona(
  @Param('idPersona') idPersona: string,
  @Body() dto: CreateUserDataDto
) {
  return this.usersService.createUserFromExistingPersona(idPersona, dto);
}


// activar usuario 

@Patch(':id/activar')
async activar(@Param('id') id: string) {
  return this.usersService.activar(id);
}

}
