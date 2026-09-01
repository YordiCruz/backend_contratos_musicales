import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateReemplazoDataDto } from "./create-reemplazo-data.dto";
import { CreatePersonaDto } from "../../personas/dto/create-persona.dto";

export class CreateReemplazoDto {

    @ApiProperty({ type: () => CreatePersonaDto })
    @ValidateNested()
    @Type(() => CreatePersonaDto)
    persona: CreatePersonaDto;
        
        
    @ApiProperty({ type: () => CreateReemplazoDataDto })
    @ValidateNested()
    @Type(() => CreateReemplazoDataDto)
    reemplazo: CreateReemplazoDataDto;

}
