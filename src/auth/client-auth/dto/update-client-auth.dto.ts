import { PartialType } from '@nestjs/swagger';
import { ClientLoginDto } from './client-login.dto';

export class UpdateClientAuthDto extends PartialType(ClientLoginDto) {}
