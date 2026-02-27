import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEventoDto  {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsNumber()
  precio_base?: number;

  @IsOptional()
  @IsNumber()
  descuento?: number;

}
