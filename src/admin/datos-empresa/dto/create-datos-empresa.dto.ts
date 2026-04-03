import { IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateDatosEmpresaDto {

  @IsString({message: 'El nombre de la empresa es obligatorio'})
  nombre_empresa: string;

  @IsString({message: 'El nombre del lugar es obligatorio'})
  @Length(3, 100, {message: 'El nombre del lugar debe tener entre $constraint1 y $constraint2 caracteres'})
  nombre_lugar: string;

  @IsString({message: 'El propietario de la empresa es obligatorio'})
  @Length(5, 50, {message: `El propietario de la empresa debe tener entre $constraint1 y $constraint2 caracteres`})
  propietario: string;

  @IsString({message: 'El teléfono de la empresa es obligatorio'})
  @Length(8, 20, {message: 'El teléfono de la empresa debe tener entre $constraint1 y $constraint2 caracteres'})
  telefono: string;

  @IsString({message: 'El email de la empresa es obligatorio'})
  email: string;

  @IsNumber()
  latitud: number;

  @IsNumber()
  longitud: number;

  @IsString({message: 'La dirección de la empresa es obligatorio'})
  direccion: string;

  @IsOptional()
  @IsString()
  ciudad?: string;
}
