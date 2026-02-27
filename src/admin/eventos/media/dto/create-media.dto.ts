import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateMediaDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id_evento: string;

  @IsString()
  tipo: string; // imagen, video

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  orden?: number;

  @IsOptional()
  @IsBoolean()
  visibilidad_publica?: boolean;

}
