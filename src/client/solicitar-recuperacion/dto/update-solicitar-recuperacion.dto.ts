import { PartialType } from '@nestjs/swagger';
import { CreateSolicitarRecuperacionDto } from './create-solicitar-recuperacion.dto';

export class UpdateSolicitarRecuperacionDto extends PartialType(CreateSolicitarRecuperacionDto) {}
