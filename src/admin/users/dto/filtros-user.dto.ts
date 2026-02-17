import { IsOptional, IsString, IsNumberString, IsIn } from 'class-validator';

export class FiltrosUserDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  estado?: string;

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