import { PartialType } from '@nestjs/swagger';
import { CreateIntegranteDataDto } from './create-integrante-data.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AsignarEspecialidadDto } from './asignar-especialidad.dto';

export class UpdateIntegranteDto extends PartialType(CreateIntegranteDataDto) {

     @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AsignarEspecialidadDto)
  especialidades?: AsignarEspecialidadDto[];

}
