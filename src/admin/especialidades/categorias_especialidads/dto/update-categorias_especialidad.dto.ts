import { PartialType } from '@nestjs/swagger';
import { CreateCategoriasEspecialidadDto } from './create-categorias_especialidad.dto';

export class UpdateCategoriasEspecialidadDto extends PartialType(CreateCategoriasEspecialidadDto) {}
