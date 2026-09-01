import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class ConfirmContratoDto {
  @IsUUID()
  id_contrato: string;

  @IsBoolean()
  acepta: boolean;

  @IsString()
  @IsOptional()
  motivo?: string;
}