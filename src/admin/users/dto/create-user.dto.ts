import { ValidateNested } from "class-validator";
import { CreateUserDataDto } from "./create-user-data.dto";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { CreatePersonaDto } from "../../personas/dto/create-persona.dto";
import { Client } from "../../clients/entities/client.entity";
export class CreateUserDto {

  @ApiProperty({ type: () => CreatePersonaDto })
  @ValidateNested()
  @Type(() => CreatePersonaDto)
  persona: CreatePersonaDto;


  @ApiProperty({ type: () => CreateUserDataDto })
  @ValidateNested()
  @Type(() => CreateUserDataDto)
  user: CreateUserDataDto;

@ApiProperty({ type: () => Client })
  @ValidateNested()
  @Type(() => Client)
  cliente: Client;


}
