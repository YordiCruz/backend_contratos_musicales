import {  OmitType, PartialType } from '@nestjs/swagger';
import { CreateClientDataDto } from './create-client-data.dto';

export class UpdateClientDto extends OmitType(CreateClientDataDto, ['tipo_cliente', 'origen_registro', 'saldo_pendiente', 'limite_credito']) {}
