import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsString } from 'class-validator';
export class CreateReemplazoDataDto {
    
  @IsNumber({ maxDecimalPlaces: 2 })
  tarifa_base_hora: number;

  @IsString()
  @IsIn(['activo', 'inactivo', 'suspendido'])
  estado: string;

  @IsString()
  @IsIn(['USD', 'BOB'])
  moneda: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  disponible: boolean;
}
