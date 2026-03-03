import { IsOptional, IsString, IsUUID } from 'class-validator';

export class AsignarEspecialidadDto {
    @IsUUID()
    id_especialidad: string;

    @IsOptional()
    @IsString()
    tipo?: string
}

