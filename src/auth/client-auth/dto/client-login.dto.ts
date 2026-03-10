import { IsString, MinLength } from "class-validator";

export class ClientLoginDto {

  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;


}
