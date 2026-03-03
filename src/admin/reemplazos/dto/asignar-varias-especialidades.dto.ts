import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsUUID, ValidateNested } from "class-validator";
import { AsignarEspecialidadDto } from "./asignar-especialidad.dto";

export class AsignarVariasEspecialidadesDto {
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true})
    @Type(() => AsignarEspecialidadDto)
    especialidades: AsignarEspecialidadDto[];
}