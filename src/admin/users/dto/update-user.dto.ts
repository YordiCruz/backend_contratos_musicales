import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDataDto } from './create-user-data.dto';
import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDataDto) {

    email?: string;

    rol?: string;

     @IsOptional()
     @IsString({message: 'La contraseña es obligatoria'})
     @MinLength(8, {message: 'La contraseña debe tener al menos $constraint1 caracteres'})
     @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {message: 'La contraseña debe contener mayúscula, minúscula y números'})
     newpassword?: string;

}