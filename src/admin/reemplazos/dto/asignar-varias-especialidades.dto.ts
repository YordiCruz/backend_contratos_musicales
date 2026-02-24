import { ArrayNotEmpty, IsArray, IsUUID } from "class-validator";

export class AsignarVariasEspecialidadesDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('all', { each: true })
    ids_especialidades: string[];
}