import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateContratoIntegranteDto {
  @IsUUID()
  id_contrato: string;

  @IsUUID()
  id_integrante: string;

  @IsString()
  rol: string;

  @IsNumber()
  compensacion_hora: number;

  @IsNumber()
  horas_contratadas: number
  
}