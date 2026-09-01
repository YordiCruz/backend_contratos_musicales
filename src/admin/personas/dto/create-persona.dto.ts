import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length, Matches } from "class-validator";

export class CreatePersonaDto {


    @IsString({message: 'El nombre debe ser texto'})
    @IsNotEmpty()
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, {
  message: 'El nombre solo debe contener letras'
})
    nombre: string;

    @IsString({message: 'El apellido es obligatorio'})
    @IsNotEmpty()
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, {
  message: 'El apellido solo debe contener letras'
})
    apellido: string;

    @IsString({message: 'El documento de identidad es obligatorio'})
    @IsNotEmpty()
    @Length(8, 20, {message: 'El documento de identidad debe tener entre $constraint1 y $constraint2 caracteres'})
    @Matches(/^\+?[0-9]+$/, {message: 'El documento solo debe contener números'})
    documento_identidad: string;

    @IsString({message: 'El telefono es obligatorio'})
    @IsNotEmpty()
    @Length(8, 20, {message: 'El telefono debe tener entre $constraint1 y $constraint2 caracteres'})
    @Matches(/^\+?[0-9]+$/, {message: 'El telefono solo debe contener números'})
    telefono: string;

    @IsEmail({}, {message: 'El email personal es invalido'})
    @IsOptional()
    email: string;

}
