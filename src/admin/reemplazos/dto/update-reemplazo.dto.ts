import { PartialType } from '@nestjs/swagger';
import { CreateReemplazoDataDto } from './create-reemplazo-data.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AsignarEspecialidadDto } from './asignar-especialidad.dto';

export class UpdateReemplazoDto extends PartialType(CreateReemplazoDataDto) {

      @IsOptional()
      @ValidateNested({ each: true })
      @Type(() => AsignarEspecialidadDto)
      especialidades?: AsignarEspecialidadDto[];

}
