import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';

// DTO de creación con mensajes de error personalizados
export class CreatePagoDto {

  @IsNotEmpty()
  @IsUUID()
  contratoId: string;

  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(0, { message: 'El monto debe ser mayor o igual a 0' })
  monto: number;

  @IsNotEmpty({ message: 'El método de pago es obligatorio' })
  @IsString({ message: 'El método debe ser texto' })
  metodo: string;

  @IsNotEmpty({ message: 'El tipo de pago es obligatorio' })
  @IsString({ message: 'El tipo de pago debe ser texto' })
  tipo: string;

  @IsOptional()
  @IsString({ message: 'La referencia debe ser texto' })
  referencia?: string;

  @IsOptional()
  @IsString({ message: 'El proveedor debe ser texto' })
  proveedor?: string;

  @IsOptional()
  @IsString({ message: 'El ID de transacción debe ser texto' })
  transaccion_id?: string;

  @IsOptional()
  payload?: any;

  @IsOptional()
  @IsNumber({}, { message: 'El descuento debe ser un número' })
  descuento?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El monto final debe ser un número' })
  monto_final?: number;
}