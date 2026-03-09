import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateContratoReemplazoDto {
  @IsUUID()
  id_contrato: string;

  @IsUUID()
  id_reemplazo: string;

  @IsString()
  rol: string;

  @IsNumber()
  compensacion_hora: number;

  @IsNumber()
  horas_contratadas: number;
}