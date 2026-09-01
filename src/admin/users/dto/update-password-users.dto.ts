import { IsOptional, IsString, Matches, MinLength } from "class-validator";

export class UpdatePasswordUsersDto {
   
    @IsOptional()
     @IsString({message: 'La contraseña es obligatoria'})
      @MinLength(8, {message: 'La contraseña debe tener al menos $constraint1 caracteres'})
      @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {message: 'La contraseña debe contener mayúscula, minúscula y números'})
      newpassword?: string;
}