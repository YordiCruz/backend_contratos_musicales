import { IsOptional, IsString } from "class-validator";

export class UpdatePasswordUsersDto {
    @IsString()
    @IsOptional()    
    newpassword?: string;
}