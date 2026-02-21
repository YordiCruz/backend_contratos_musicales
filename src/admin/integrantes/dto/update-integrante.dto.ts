import { PartialType } from '@nestjs/swagger';
import { CreateIntegranteDataDto } from './create-integrante-data.dto';

export class UpdateIntegranteDto extends PartialType(CreateIntegranteDataDto) {}
