export class CreateUserDto {
    /** Nombre de usuario único */
  username: string;

  /** Hash o contraseña en texto plano (según tu lógica de negocio) */
  password_hash: string;

  /** Fecha del último login (opcional) */
  ultimo_login?: Date;

  /** Estado del usuario (por defecto: 'activo') */
  estado?: string = 'activo';

  /** Origen del registro (por defecto: 'admin') */
  origen_registro?: string = 'admin';

}
