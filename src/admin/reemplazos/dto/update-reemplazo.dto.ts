import { PartialType } from '@nestjs/swagger';
import { CreateReemplazoDataDto } from './create-reemplazo-data.dto';

export class UpdateReemplazoDto extends PartialType(CreateReemplazoDataDto) {}
