import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateDisponibilidadEventoDto {
  @IsOptional()
  @IsString()
  estado?: string; // libre | ocupado

  @IsOptional()
  @IsUUID()
  id_contrato?: string;
}