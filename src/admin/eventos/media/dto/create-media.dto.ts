import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateMediaDto {

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
