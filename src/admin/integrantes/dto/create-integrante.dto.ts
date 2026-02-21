import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreatePersonaDto } from "src/admin/personas/dto/create-persona.dto";
import { CreateIntegranteDataDto } from "./create-integrante-data.dto";

export class CreateIntegranteDto {

    @ApiProperty({ type: () => CreatePersonaDto })
    @ValidateNested()
    @Type(() => CreatePersonaDto)
    persona: CreatePersonaDto;
    
    
    @ApiProperty({ type: () => CreateIntegranteDataDto })
    @ValidateNested()
    @Type(() => CreateIntegranteDataDto)
    integrante: CreateIntegranteDataDto;

}
