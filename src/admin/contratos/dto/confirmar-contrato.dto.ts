import { IsNumber, IsUUID } from "class-validator";

export class ConfirmarContratoDto {
  @IsUUID()
  id_integrante: string;

  @IsUUID()
  id_especialidad: string;

  @IsNumber()
  horas_contratadas: number;
}