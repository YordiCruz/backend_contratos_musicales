import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Matches } from "class-validator";

export class CreateEventoDto {
  @IsUUID()
  @IsString()
  id_categoria: string;

  @IsString()
  @Length(3, 100)
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s-]+$/, {
  message: 'El nombre contiene caracteres no permitidos'
})
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @Type(() => Number)
  @IsNumber()
  precio_base: number;


}
