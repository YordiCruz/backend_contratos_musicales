import { IsString, MinLength } from "class-validator";

export class ClientLoginDto {

  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;


}
