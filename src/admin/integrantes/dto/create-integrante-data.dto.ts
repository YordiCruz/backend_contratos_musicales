import { IsDateString, IsIn, IsNumber, IsString } from "class-validator";

export class CreateIntegranteDataDto {

  @IsNumber({ maxDecimalPlaces: 2 })
  tarifa_base_hora: number;

  @IsString()
  @IsIn(['USD', 'BOB'])
  moneda: string;

  @IsDateString()
  fecha_ingreso: string; // formato ISO: "2026-02-20"

  @IsString()
  @IsIn(['activo', 'inactivo', 'suspendido'])
  estado: string;




    
}