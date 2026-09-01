
import { IsDateString, IsOptional, IsString, IsNumber, IsUUID, IsBoolean } from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  horas_extra?: number;

  @IsOptional()
  @IsNumber()
  monto_total?: number;

  @IsOptional()
  @IsNumber()
  descuento?: number;

  @IsNumber()
  precio_original: number;

  @IsNumber()
  porcentaje_descuento: number;

  @IsOptional()
  @IsBoolean()
  cliente_acepto_contrato?: boolean;
  

}

export class CreateContratoDto2 {
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

  @IsOptional()
  @IsNumber()
  horas_extra?: number;

  @IsOptional()
  @IsNumber()
  monto_total?: number;

  @IsOptional()
  @IsNumber()
  descuento?: number;

  @IsNumber()
  precio_original: number;

  @IsNumber()
  porcentaje_descuento: number;

  @IsNumber()
  porcentaje_adelanto: number;

  @IsBoolean()
  cliente_acepto_contrato: boolean;

  @IsOptional()
  @IsString()
  cliente_motivo_cancelacion?: string;

  

}