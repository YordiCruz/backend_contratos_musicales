import { IsIn, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateClientDataDto {
 

  @IsString()
  @IsIn(['individual', 'empresa'])
  tipo_cliente: string;

  @IsString()
  @IsIn(['web', 'admin', 'bot'])
  origen_registro: string;

  @IsOptional()
  @IsString()
  @IsIn(['whatsapp', 'email'])
  preferencia_contacto?: string;


  @IsOptional()
  @IsString()
  @IsIn(['activo', 'inactivo', 'bloqueado'])
  estado?: string;

}