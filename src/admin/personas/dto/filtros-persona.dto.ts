import { IsIn, IsNumberString, IsOptional, IsString } from "class-validator";

export class FiltrosPersonaDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  documento_identidad?: string;

  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  limit?: number;


  @IsOptional()
  @IsString()
  @IsIn(['username', 'estado', 'creado_en'])
  sort?: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc', 'ASC', 'DESC'])
  order?: string;
}


