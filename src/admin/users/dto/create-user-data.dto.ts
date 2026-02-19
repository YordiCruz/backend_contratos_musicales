import { IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDataDto {
    
    /** Nombre de usuario único */
  @IsString()
  @IsNotEmpty()
  username: string;


  /** Hash o contraseña en texto plano (según tu lógica de negocio) */
  @IsString()
  @MinLength(6)
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
}