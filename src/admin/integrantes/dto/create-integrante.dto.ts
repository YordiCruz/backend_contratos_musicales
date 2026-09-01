import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateIntegranteDataDto } from "./create-integrante-data.dto";
import { CreatePersonaDto } from "../../personas/dto/create-persona.dto";

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
