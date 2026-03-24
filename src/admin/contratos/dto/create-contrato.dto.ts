
import { IsDateString, IsOptional, IsString, IsNumber, IsUUID } from 'class-validator';

export class CreateContratoDto {
  @IsUUID()
  id_cliente: string;

  @IsUUID()
  id_evento: string;

  @IsUUID()
  id_ubicacion: string;

  @IsDateString()
  fecha_evento: Date;

  @IsString()
  bloque: string;

  @IsOptional()
  @IsString()
  hora_inicio?: string;

  @IsOptional()
  @IsString()
  hora_fin?: string;

  @IsOptional()
  @IsString()
  tipo_servicio?: string;

  @IsOptional()
  @IsNumber()
  horas_contratadas?: number;

}