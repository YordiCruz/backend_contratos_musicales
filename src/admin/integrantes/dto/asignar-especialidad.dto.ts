import { IsUUID } from 'class-validator';

export class AsignarEspecialidadDto {
    @IsUUID()
    id_especialidad: string;
}

