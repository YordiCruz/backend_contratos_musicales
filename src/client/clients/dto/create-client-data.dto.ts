import { IsIn, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateClientDataDto {
 

  @IsString()
  @IsIn(['individual', 'empresa'])
  tipo_cliente: string;

  @IsString()
  @IsIn(['web', 'admin', 'bot'])
  origen_registro: string;

  @IsString()
  @IsIn(['normal', 'vip', 'frecuente'])
  categoria: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  saldo_pendiente?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  limite_credito?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  descuentos?: number;

  @IsOptional()
  @IsString()
  contacto_secundario?: string;

  @IsOptional()
  @IsString()
  @IsIn(['whatsapp', 'email', 'telefono'])
  preferencia_contacto?: string;


  @IsOptional()
  @IsString()
  @IsIn(['activo', 'inactivo', 'bloqueado'])
  estado?: string;

}