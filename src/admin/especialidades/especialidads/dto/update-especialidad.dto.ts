import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateEspecialidadDto } from './create-especialidad.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEspecialidadDto extends PartialType(CreateEspecialidadDto)
 {
    @IsOptional()
    @IsString()
    estado?: string; 
}