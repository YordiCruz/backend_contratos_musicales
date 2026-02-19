import { ValidateNested } from "class-validator";
import { CreateUserDataDto } from "./create-user-data.dto";
import { CreatePersonaDto } from "src/admin/personas/dto/create-persona.dto";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {

  @ApiProperty({ type: () => CreatePersonaDto })
  @ValidateNested()
  @Type(() => CreatePersonaDto)
  persona: CreatePersonaDto;


  @ApiProperty({ type: () => CreateUserDataDto })
  @ValidateNested()
  @Type(() => CreateUserDataDto)
  user: CreateUserDataDto;




}
