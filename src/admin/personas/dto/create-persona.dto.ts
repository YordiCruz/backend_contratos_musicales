import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreatePersonaDto {


    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    documento_identidad: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    telefono: string;

    @IsEmail()
    @IsOptional()
    email: string;

}
