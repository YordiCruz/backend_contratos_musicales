import { IsNumber, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreatePagoDto {
  @IsUUID()
  id_contrato: string;

  @IsNumber()
  monto: number;

  @IsString()
  metodo: string;

  @IsString()
  tipo: string;

  @IsOptional()
  @IsString()
  referencia?: string;

  @IsUUID()
  registrado_por: string;
}