import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDataDto {
    
    /** Nombre de usuario único */
  @IsEmail({},{message: 'El email es invalido'})
  @IsNotEmpty()
  email: string;

  /** Hash o contraseña en texto plano (según tu lógica de negocio) */
  @IsString({message: 'La contraseña es obligatoria'})
  @MinLength(8, {message: 'La contraseña debe tener al menos $constraint1 caracteres'})
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {message: 'La contraseña debe contener mayúscula, minúscula y números'})
  password_hash: string;

  /** Fecha del último login (opcional) */
  @IsOptional()
  ultimo_login?: Date;

  /** Estado del usuario (por defecto: 'activo') */
  @IsOptional()
  @IsIn(['activo', 'inactivo'])
  estado?: string = 'activo';

  /** Origen del registro (por defecto: 'admin') */
  @IsOptional()
  @IsString()
  origen_registro?: string = 'admin';

  
  /** Token de actualización (opcional) */
  @IsOptional()
  @IsString()
  refresh_token?: string


  /** Rol del usuario (opcional) */
  @IsOptional()
  @IsString()
  rol?: string
}