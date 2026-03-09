import { IsUUID, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class AsignarIntegranteDto {
  @IsUUID()
  id_integrante: string;

  @IsOptional()
  @IsNumber()
  horas_contratadas?: number;

  @IsOptional()
  @IsBoolean()
  aceptado?: boolean;
}

import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';

export class AsignarIntegrantesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AsignarIntegranteDto)
  integrantes: AsignarIntegranteDto[];
}