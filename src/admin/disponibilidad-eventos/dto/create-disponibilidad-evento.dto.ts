import { IsDateString, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateDisponibilidadEventoDto {
  @IsDateString()
  fecha: Date;

  @IsString()
  bloque: string; // mañana | noche

  @IsOptional()
  @IsString()
  estado?: string; // libre | ocupado

  @IsOptional()
  @IsUUID()
  id_contrato?: string;
}