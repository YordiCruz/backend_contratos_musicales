import { IsIn, IsNumberString, IsOptional, IsString } from "class-validator";

export class FiltrosEspecialidadDto {
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
      @IsIn(['nombre', 'estado', 'creado_en'])
      sort?: string;
    
      @IsOptional()
      @IsString()
      @IsIn(['asc', 'desc', 'ASC', 'DESC'])
      order?: string;
}