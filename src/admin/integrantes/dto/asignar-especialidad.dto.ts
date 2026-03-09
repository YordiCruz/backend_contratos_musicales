import { IsOptional, IsString, IsUUID } from 'class-validator';

export class AsignarEspecialidadDto {
    @IsUUID()
    id_especialidad: string;

    //especialidad primario o secundario
    @IsOptional()
    @IsString()
    tipo?: string
}

